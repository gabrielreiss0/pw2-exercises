class Exams {
  constructor(answer, weight) {
    this.answer = answer;
    this.weight = weight;
    this.exams = [];
  }

  add(exams) {
    this.exams.push(exams);
  }

  getScores() {
    return this.exams.map((examAnswers) => {
      let score = 0;
      for (let i = 0; i < examAnswers.length; i++) {
        if (examAnswers[i] === this.answer[i]) {
          const w = this.weight && this.weight[i] !== undefined ? this.weight[i] : 1;
          score += w;
        }
      }
      return score;
    });
  }

  avg() {
    const notas = this.getScores();
    if (notas.length === 0) return 0;

    let soma = 0;
    for (let i = 0; i < notas.length; i++) {
      soma += notas[i];
    }
    return soma / notas.length;
  }

  min(count = 1) {
    const notas = this.getScores();
    const menores = notas.sort((a, b) => a - b);
    return menores.slice(0, count);
  }

  max(count = 1) {
    const notas = this.getScores();
    const maiores = notas.sort((a, b) => b - a);
    return maiores.slice(0, count);
  }

  lt(limit) {
    const menor = [];
    const notas = this.getScores();

    for (let i = 0; i < notas.length; i++) {
      if (notas[i] < limit) {
        menor.push(notas[i]);
      }
    }
    return menor;
  }

  gt(limit) {
    const maior = [];
    const notas = this.getScores();

    for (let i = 0; i < notas.length; i++) {
      if (notas[i] > limit) {
        maior.push(notas[i]);
      }
    }
    return maior;
  }
}

const pweb2 = new Exams(["a", "b", "a", "c", "d"], [2, 2, 2, 2, 2]);

pweb2.add(["a", "b", "a", "b", "b"]);
pweb2.add(["a", "b", "b", "b", "b"]);
pweb2.add(["a", "b", "a", "c", "b"]);
pweb2.add(["a", "b", "a", "c", "d"]);

console.log("notas:", pweb2.getScores());
console.log("média:", pweb2.avg());
console.log("menor nota:", pweb2.min());
console.log("maior nota:", pweb2.max());
console.log("notas menores que 5:", pweb2.lt(5));
console.log("notas maiores que 5:", pweb2.gt(5));

