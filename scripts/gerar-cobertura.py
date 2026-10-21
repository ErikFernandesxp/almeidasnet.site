#!/usr/bin/env python3
"""
Gera js/cobertura.js a partir do CSV de clientes (colunas: CEP;Endereço;Bairro).

Uso (na pasta do site):
    python3 scripts/gerar-cobertura.py caminho/do/arquivo.csv

Regras:
  - ignora linhas sem CEP ou com CEP fora do formato 00000-000;
  - ignora CEPs fora de Salvador (faixa 40000-000 a 42599-999) — ex.: Lauro de Freitas;
  - ignora CEPs de uma lista de exclusão (EXCLUIR) para erros de digitação conhecidos;
  - padroniza o nome do bairro (maiúsculas/acentos/erros de digitação);
  - NÃO publica ruas nem dados de clientes: só CEP (8 dígitos) agrupado por bairro.
"""
import csv, collections, json, re, sys, unicodedata

SALVADOR = (40000000, 42599999)
# CEPs que parecem erro de cadastro no CSV (não corrigimos "no chute": só tiramos).
# São CEPs cuja região não bate com o bairro informado (todos marcados como "Itapuã"):
#   42610-258  Rua Juazeiro (a mesma rua já existe como 41610-260)
#   40230-705  Avenida Sampaio (região central de Salvador, longe do Itapuã)
#   42412-120  Rua da Ilha (região do Subúrbio, longe do Itapuã)
# Se algum for real, é só apagar da lista e rodar o script de novo.
EXCLUIR = {"42610-258", "40230-705", "42412-120"}

CANON = {
    "itapua": "Itapuã", "itapoa": "Itapuã",
    "nova brasilia de itapua": "Nova Brasília de Itapuã",
    "sao cristovao": "São Cristóvão",
    "piata": "Piatã",
    "stella maris": "Stella Maris",
    "jardim placaford": "Jardim Placaford", "jardim plakafor": "Jardim Placaford", "jardim pakafor": "Jardim Placaford",
    "alto do coqueirinho": "Alto do Coqueirinho", "alto do coqueirnho": "Alto do Coqueirinho",
    "bairro da paz": "Bairro da Paz", "cassange": "Cassange", "paralela": "Paralela", "armacao": "Armação",
}

def chave(txt):
    t = unicodedata.normalize("NFD", txt.lower())
    t = "".join(c for c in t if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z ]", "", t).strip()

def main(csv_path):
    linhas = list(csv.reader(open(csv_path, encoding="utf-8"), delimiter=";"))[1:]
    votos = collections.defaultdict(collections.Counter)
    descartes = collections.Counter()
    for r in linhas:
        if len(r) < 3 or not r[0].strip():
            descartes["sem CEP"] += 1; continue
        cep, bairro = r[0].strip(), r[2].strip()
        if not re.fullmatch(r"\d{5}-\d{3}", cep):
            descartes["CEP fora do formato"] += 1; continue
        n = int(cep.replace("-", ""))
        if cep in EXCLUIR:
            descartes["CEP na lista de exclusão"] += 1; continue
        if not (SALVADOR[0] <= n <= SALVADOR[1]):
            descartes["fora de Salvador"] += 1; continue
        nome = CANON.get(chave(bairro))
        if not nome:
            print("ATENÇÃO: bairro sem padronização:", repr(bairro), cep)
            nome = bairro
        votos[cep.replace("-", "")][nome] += 1

    grupos = collections.defaultdict(list)
    sem_bairro = []
    for cep, c in sorted(votos.items()):
        top = c.most_common()
        if len(top) > 1 and top[0][1] == top[1][1]:   # empate: não chutamos o bairro
            sem_bairro.append(cep); grupos[""].append(cep)
        else:
            grupos[top[0][0]].append(cep)

    saida = {b: grupos[b] for b in sorted(grupos, key=lambda b: (-len(grupos[b]), b))}
    js = ("/* Base de cobertura — GERADO por scripts/gerar-cobertura.py. Não edite à mão.\n"
          "   Só CEPs de Salvador de clientes atendidos (sem ruas nem dados pessoais). */\n"
          "window.ALMEIDAS_COBERTURA = " + json.dumps(saida, ensure_ascii=False, separators=(",", ":")) + ";\n")
    open("js/cobertura.js", "w", encoding="utf-8").write(js)

    total = sum(len(v) for v in grupos.values())
    print("CEPs únicos na cobertura:", total)
    for b, v in saida.items(): print(f"  {len(v):4d}  {b or '(bairro indefinido)'}")
    print("descartes (linhas):", dict(descartes))
    if sem_bairro: print("CEPs com bairro em empate (ficam sem bairro):", sem_bairro)

if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "cep_e_enderecos.csv")
