
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Question } from 'src/app/Interfaces/question';
import { MBTIScores } from '../../Interfaces/mbtiscores';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',

})
export class FormComponent {
  personality: string = ''
  age: number = 0
  budget: number = 0



  /*destination: string = ''
  extrovertScore: number = 0;
  introvertScore: number = 0;
  sensingScore: number = 0;
  intuitionScore: number = 0;
  thinkingScore: number = 0;
  feelingScore: number = 0;
  judgingScore: number = 0;
  perceivingScore: number = 0;



  mbtiScores: MBTIScores = {
    extrovertScore: 0,
    introvertScore: 0,
    sensingScore: 0,
    intuitionScore: 0,
    thinkingScore: 0,
    feelingScore: 0,
    judgingScore: 0,
    perceivingScore: 0,
  };


  answerSelected: boolean = false;

  // Nel componente TypeScript
// Nel componente TypeScript
selectAnswer(questionIndex: number, optionIndex: number) {
  // Assegna la risposta all'indice corretto
  this.userAnswers[questionIndex] = optionIndex.toString();

  // Avanza alla prossima domanda se non siamo all'ultima domanda
  if (this.currentQuestionIndex < this.questions.length - 1) {
    this.currentQuestionIndex++;
  } else {
    this.onFormSubmit();
  }

}










  currentQuestionIndex: number = 0;





  userAnswers: string[] = [];

  questions: Question[] = [
    {
      text: 'Quando incontri nuove persone, ti senti più...',
      options: ['Energizzato (Estroverso)', 'Riflessivo (Introverso)'],
      dimensions: ['E', 'I']
    },
    {
      text: 'Quando prendi decisioni importanti, tendi a fare affidamento su...',
      options: ['Dati concreti (Sensoriale)', 'Intuizioni (Intuitivo)'],
      dimensions: ['S', 'N']
    },
    {
      text: 'Nelle discussioni, sei più incline a seguire la tua...',
      options: ['Logica (Pensiero)', 'Cuore (Sentimento)'],
      dimensions: ['T', 'F']
    },
    {
      text: 'Nel tuo lavoro, preferisci avere...',
      options: ['Struttura e pianificazione (Giudizio)', 'Flessibilità e adattabilità (Percezione)'],
      dimensions: ['J', 'P']
    },
    {
      text: 'Sei più propenso a...',
      options: ['Pianificare attentamente le attività (Giudizio)', "Lasciare spazio per l'improvvisazione (Percezione)"],
      dimensions: ['J', 'P']
    },
    {
      text: 'Ti piace passare il tempo con...',
      options: ['Molte persone (Estroverso)', 'Pochi amici intimi (Introverso)'],
      dimensions: ['E', 'I']
    },
    {
      text: 'Quando affronti un problema, solitamente segui il tuo...',
      options: ['Ragionamento (Pensiero)', 'Istinto (Sentimento)'],
      dimensions: ['T', 'F']
    },
    {
      text: 'Preferisci situazioni in cui hai chiare...',
      options: ['Regole e struttura (Giudizio)', 'Flessibilità e apertura (Percezione)'],
      dimensions: ['J', 'P']
    },
    {
      text: 'Ti senti più a tuo agio con...',
      options: ['Fatti e dati concreti (Sensoriale)', 'Concetti e idee astratte (Intuitivo)'],
      dimensions: ['S', 'N']
    },
    {
      text: 'Nelle relazioni, tendi a essere più...',
      options: ['Obiettivo e critico (Pensiero)', 'Empatico e comprensivo (Sentimento)'],
      dimensions: ['T', 'F']
    },
    {
      text: 'Quando pianifichi un viaggio, preferisci...',
      options: ['Avere un itinerario dettagliato (Giudizio)', "Lasciare spazio per l'avventura (Percezione)"],
      dimensions: ['J', 'P']
    },
    {
      text: 'Ti senti più stimolato da...',
      options: ['Situazioni sociali e interazioni (Estroverso)', 'Riflessioni e solitudine (Introverso)'],
      dimensions: ['E', 'I']
    },
    {
      text: 'Sei più orientato verso...',
      options: ['La realtà tangibile (Sensoriale)', 'Le possibilità future (Intuitivo)'],
      dimensions: ['S', 'N']
    },
    {
      text: 'Ti consideri più un...',
      options: ['Pianificatore (Giudizio)', 'Esploratore (Percezione)'],
      dimensions: ['P', 'J']
    },
    {
      text: 'Nelle tue decisioni, tendi a dare maggior peso...',
      options: ["Alla logica e all'obiettività (Pensiero)", 'Alle tue emozioni e ai valori personali (Sentimento)'],
      dimensions: ['T', 'F']
    },
    // Nuove domande
    {
      text: 'Quando sei con altre persone, preferisci essere al centro dell\'attenzione o rimanere più in disparte?',
      options: ['Centro dell\'attenzione (Estroverso)', 'Rimanere in disparte (Introverso)'],
      dimensions: ['E', 'I']
    },
    {
      text: 'Sei più orientato a concentrarti sui dettagli concreti o a immaginare possibilità future?',
      options: ['Dettagli concreti (Sensoriale)', 'Possibilità future (Intuitivo)'],
      dimensions: ['S', 'N']
    },
    {
      text: 'Nelle decisioni, segui principalmente la logica e il ragionamento o ti basi su sentimenti ed emozioni personali?',
      options: ['Logica e ragionamento (Pensiero)', 'Sentimenti ed emozioni (Sentimento)'],
      dimensions: ['T', 'F']
    },
    {
      text: 'Preferisci pianificare le tue attività in anticipo o ti piace mantenere la flessibilità e decidere al momento?',
      options: ['Pianificare in anticipo (Giudizio)', 'Mantenere la flessibilità (Percezione)'],
      dimensions: ['J', 'P']
    },
    {
      text: 'Ti senti più stimolato da situazioni sociali o momenti di solitudine e riflessione?',
      options: ['Situazioni sociali (Estroverso)', 'Solitudine e riflessione (Introverso)'],
      dimensions: ['E', 'I']
    },
    {
      text: 'Sei solito concentrarti su ciò che è già noto e concreto o ad abbracciare nuove idee e possibilità?',
      options: ['Concentrarti sul noto (Sensoriale)', 'Abbracciare nuove idee (Intuitivo)'],
      dimensions: ['S', 'N']
    },
    {
      text: 'Nelle tue relazioni, tendi a essere obiettivo e critico o empatico e comprensivo?',
      options: ['Obiettivo e critico (Pensiero)', 'Empatico e comprensivo (Sentimento)'],
      dimensions: ['T', 'F']
    },
    {
      text: 'Quando affronti un problema, preferisci seguire il tuo ragionamento e la tua analisi o affidarti all\'istinto e all\'intuizione?',
      options: ['Seguire ragionamento (Pensiero)', 'Affidarti all\'intuizione (Sentimento)'],
      dimensions: ['T', 'F']
    },
    {
      text: 'Ti senti più a tuo agio in situazioni strutturate e organizzate o in contesti più aperti e adattabili?',
      options: ['Situazioni strutturate (Giudizio)', 'Contesti aperti (Percezione)'],
      dimensions: ['J', 'P']
    },
    {
      text: 'Sei più orientato a basarti sui fatti e sulla realtà concreta o a esplorare le possibilità future e le idee astratte?',
      options: ['Fatti concreti (Sensoriale)', 'Possibilità future (Intuitivo)'],
      dimensions: ['S', 'N']
    },
    {
      text: 'Nelle discussioni, sei più incline a seguire la logica e il pensiero razionale o a esprimere le tue emozioni e opinioni personali?',
      options: ['Logica e pensiero (Pensiero)', 'Emozioni e opinioni (Sentimento)'],
      dimensions: ['T', 'F']
    },
    {
      text: 'Quando pianifichi un viaggio, preferisci avere un itinerario dettagliato o lasciare spazio per l\'avventura e l\'improvvisazione?',
      options: ['Itinerario dettagliato (Giudizio)', 'Spazio per l\'avventura (Percezione)'],
      dimensions: ['J', 'P']
    },
    {
      text: 'Ti senti più stimolato da situazioni sociali e interazioni con gli altri o dalla riflessione e dalla solitudine?',
      options: ['Situazioni sociali (Estroverso)', 'Riflessione e solitudine (Introverso)'],
      dimensions: ['E', 'I']
    },
    {
      text: 'Sei più orientato verso la realtà tangibile e ciò che puoi toccare o verso le possibilità future e le idee astratte?',
      options: ['Realità tangibile (Sensoriale)', 'Possibilità future (Intuitivo)'],
      dimensions: ['S', 'N']
    },
    {
      text: 'Nelle tue decisioni, tendi a dare maggior peso alla logica e all\'obiettività o alle tue emozioni e ai tuoi valori personali?',
      options: ['Logica e obiettività (Pensiero)', 'Emozioni e valori (Sentimento)'],
      dimensions: ['T', 'F']
    }
  ];


















  mbtiDestinations: Record<string, string> = {
    'ENFP': 'Tokyo, Giappone',
    'INTJ': 'Londra, Regno Unito',
    'ESFP': 'Bali, Indonesia',
    'ISTP': 'Patagonia, Argentina',
    'ESTJ': 'New York City, Stati Uniti',
    'ISFJ': 'Amsterdam, Paesi Bassi',
    'ENTJ': 'Singapore',
    'INFJ': 'Praga, Repubblica Ceca',
    'ESTP': 'Sydney, Australia',
    'ISFP': 'Costa Rica',
    'ENTP': 'Berlino, Germania',
    'INFP': 'Kyoto, Giappone',
    'ESFJ': 'Parigi, Francia',
    'INTP': 'Toronto, Canada',

  };




  onFormSubmit() {
    // Inizializza gli score per ciascuna dimensione MBTI
    const mbtiScores: MBTIScores = {
      extrovertScore: 0,
      introvertScore: 0,
      sensingScore: 0,
      intuitionScore: 0,
      thinkingScore: 0,
      feelingScore: 0,
      judgingScore: 0,
      perceivingScore: 0,
    };

    // Inizializza contatori per i punteggi delle domande con score 4 e 5
    let score4Counter = 0;
    let score5Counter = 0;

    // Calcola i punteggi per le dimensioni
    this.userAnswers.forEach((answer, index) => {
      const dimensions = this.questions[index].dimensions;
      let score: number;

      // Determina lo score in base all'importanza della domanda
      if (index === 2 || index === 3 || index === 6 || index === 9 || index === 12 || index === 14 || index === 17 || index === 18 || index === 19 || index === 20) {
        score = 4;
        score4Counter++;
      } else if (index === 0 || index === 1 || index === 5 || index === 7 || index === 8 || index === 10 || index === 11 || index === 13 || index === 15 || index === 16) {
        score = 5;
        score5Counter++;
      } else {
        score = 2; // Domande con score 2
      }

      // Aggiorna gli score in base alla dimensione corrente
      dimensions.forEach(dimension => {
        switch (dimension) {
          case 'E':
            mbtiScores.extrovertScore += score;
            break;
          case 'I':
            mbtiScores.introvertScore += score;
            break;
          case 'S':
            mbtiScores.sensingScore += score;
            break;
          case 'N':
            mbtiScores.intuitionScore += score;
            break;
          case 'T':
            mbtiScores.thinkingScore += score;
            break;
          case 'F':
            mbtiScores.feelingScore += score;
            break;
          case 'J':
            mbtiScores.judgingScore += score;
            break;
          case 'P':
            mbtiScores.perceivingScore += score;
            break;
          default:
            // Gestisci qualsiasi altra situazione o errore qui
            break;
        }
      });
    });

    // Somma i punteggi delle domande con score 4 e 5 separatamente
    let totalExtrovertScore = mbtiScores.extrovertScore;
    let totalIntrovertScore = mbtiScores.introvertScore;
    let totalSensingScore = mbtiScores.sensingScore;
    let totalIntuitionScore = mbtiScores.intuitionScore;
    let totalThinkingScore = mbtiScores.thinkingScore;
    let totalFeelingScore = mbtiScores.feelingScore;
    let totalJudgingScore = mbtiScores.judgingScore;
    let totalPerceivingScore = mbtiScores.perceivingScore;

    // Aggiungi i punteggi delle domande con score 4 e 5
    totalExtrovertScore += score4Counter * 4;
    totalIntrovertScore += score4Counter * 4;
    totalSensingScore += score4Counter * 4;
    totalIntuitionScore += score4Counter * 4;
    totalThinkingScore += score4Counter * 4;
    totalFeelingScore += score4Counter * 4;
    totalJudgingScore += score4Counter * 4;
    totalPerceivingScore += score4Counter * 4;

    console.log('Total Extrovert Score:', totalExtrovertScore);
    console.log('Total Introvert Score:', totalIntrovertScore);
    console.log('Total Sensing Score:', totalSensingScore);
    console.log('Total Intuition Score:', totalIntuitionScore);
    console.log('Total Thinking Score:', totalThinkingScore);
    console.log('Total Feeling Score:', totalFeelingScore);
    console.log('Total Judging Score:', totalJudgingScore);
    console.log('Total Perceiving Score:', totalPerceivingScore);

    // Determina la lettera dominante in ciascuna dimensione
    const extrovertOrIntrovert = totalExtrovertScore > totalIntrovertScore ? 'E' : 'I';
    const sensingOrIntuition = totalSensingScore > totalIntuitionScore ? 'S' : 'N';
    const thinkingOrFeeling = totalThinkingScore > totalFeelingScore ? 'T' : 'F';
    const judgingOrPerceiving = totalJudgingScore > totalPerceivingScore ? 'J' : 'P';

    // Componi la stringa MBTI finale
    const mbtiResult = extrovertOrIntrovert + sensingOrIntuition + thinkingOrFeeling + judgingOrPerceiving;

    console.log('MBTI Result:', mbtiResult);

    // Ottieni la destinazione associata al tipo di personalità
    const destination = this.mbtiDestinations[mbtiResult];
    console.log('Destination:', destination);

    // Reindirizza l'utente alla pagina dei risultati con la destinazione
    this.router.navigate(['results'], { queryParams: { destination: destination } });
  }








  @ViewChild('formRef') formRef: any;
  constructor(private router: Router){}
  resetForm(form: NgForm) {
    form.resetForm();
  }*/
  questions: Question[] = [
    {
      text: 'Quando incontri nuove persone, ti senti più...',
      options: ['Energizzato (Estroverso)', 'Riflessivo (Introverso)'],
      dimensions: ['E', 'I']
    },
    {
      text: 'Quando prendi decisioni importanti, tendi a fare affidamento su...',
      options: ['Dati concreti (Sensoriale)', 'Intuizioni (Intuitivo)'],
      dimensions: ['S', 'N']
    },
    {
      text: 'Nelle discussioni, sei più incline a seguire la tua...',
      options: ['Logica (Pensiero)', 'Cuore (Sentimento)'],
      dimensions: ['T', 'F']
    },
    {
      text: 'Nel tuo lavoro, preferisci avere...',
      options: ['Struttura e pianificazione (Giudizio)', 'Flessibilità e adattabilità (Percezione)'],
      dimensions: ['J', 'P']
    },
    {
      text: 'Sei più propenso a...',
      options: ['Pianificare attentamente le attività (Giudizio)', "Lasciare spazio per l'improvvisazione (Percezione)"],
      dimensions: ['J', 'P']
    },
    {
      text: 'Ti piace passare il tempo con...',
      options: ['Molte persone (Estroverso)', 'Pochi amici intimi (Introverso)'],
      dimensions: ['E', 'I']
    },
    {
      text: 'Quando affronti un problema, solitamente segui il tuo...',
      options: ['Ragionamento (Pensiero)', 'Istinto (Sentimento)'],
      dimensions: ['T', 'F']
    },
    {
      text: 'Preferisci situazioni in cui hai chiare...',
      options: ['Regole e struttura (Giudizio)', 'Flessibilità e apertura (Percezione)'],
      dimensions: ['J', 'P']
    },
    {
      text: 'Ti senti più a tuo agio con...',
      options: ['Fatti e dati concreti (Sensoriale)', 'Concetti e idee astratte (Intuitivo)'],
      dimensions: ['S', 'N']
    },
    {
      text: 'Nelle relazioni, tendi a essere più...',
      options: ['Obiettivo e critico (Pensiero)', 'Empatico e comprensivo (Sentimento)'],
      dimensions: ['T', 'F']
    },
    {
      text: 'Quando pianifichi un viaggio, preferisci...',
      options: ['Avere un itinerario dettagliato (Giudizio)', "Lasciare spazio per l'avventura (Percezione)"],
      dimensions: ['J', 'P']
    },
    {
      text: 'Ti senti più stimolato da...',
      options: ['Situazioni sociali e interazioni (Estroverso)', 'Riflessioni e solitudine (Introverso)'],
      dimensions: ['E', 'I']
    },
    {
      text: 'Sei più orientato verso...',
      options: ['La realtà tangibile (Sensoriale)', 'Le possibilità future (Intuitivo)'],
      dimensions: ['S', 'N']
    },
    {
      text: 'Ti consideri più un...',
      options: ['Pianificatore (Giudizio)', 'Esploratore (Percezione)'],
      dimensions: ['P', 'J']
    },
    {
      text: 'Nelle tue decisioni, tendi a dare maggior peso...',
      options: ["Alla logica e all'obiettività (Pensiero)", 'Alle tue emozioni e ai valori personali (Sentimento)'],
      dimensions: ['T', 'F']
    },
    // Nuove domande
    {
      text: 'Quando sei con altre persone, preferisci essere al centro dell\'attenzione o rimanere più in disparte?',
      options: ['Centro dell\'attenzione (Estroverso)', 'Rimanere in disparte (Introverso)'],
      dimensions: ['E', 'I']
    },
    {
      text: 'Sei più orientato a concentrarti sui dettagli concreti o a immaginare possibilità future?',
      options: ['Dettagli concreti (Sensoriale)', 'Possibilità future (Intuitivo)'],
      dimensions: ['S', 'N']
    },
    {
      text: 'Nelle decisioni, segui principalmente la logica e il ragionamento o ti basi su sentimenti ed emozioni personali?',
      options: ['Logica e ragionamento (Pensiero)', 'Sentimenti ed emozioni (Sentimento)'],
      dimensions: ['T', 'F']
    },
    {
      text: 'Preferisci pianificare le tue attività in anticipo o ti piace mantenere la flessibilità e decidere al momento?',
      options: ['Pianificare in anticipo (Giudizio)', 'Mantenere la flessibilità (Percezione)'],
      dimensions: ['J', 'P']
    },
    {
      text: 'Ti senti più stimolato da situazioni sociali o momenti di solitudine e riflessione?',
      options: ['Situazioni sociali (Estroverso)', 'Solitudine e riflessione (Introverso)'],
      dimensions: ['E', 'I']
    },
    {
      text: 'Sei solito concentrarti su ciò che è già noto e concreto o ad abbracciare nuove idee e possibilità?',
      options: ['Concentrarti sul noto (Sensoriale)', 'Abbracciare nuove idee (Intuitivo)'],
      dimensions: ['S', 'N']
    },
    {
      text: 'Nelle tue relazioni, tendi a essere obiettivo e critico o empatico e comprensivo?',
      options: ['Obiettivo e critico (Pensiero)', 'Empatico e comprensivo (Sentimento)'],
      dimensions: ['T', 'F']
    },
    {
      text: 'Quando affronti un problema, preferisci seguire il tuo ragionamento e la tua analisi o affidarti all\'istinto e all\'intuizione?',
      options: ['Seguire ragionamento (Pensiero)', 'Affidarti all\'intuizione (Sentimento)'],
      dimensions: ['T', 'F']
    },
    {
      text: 'Ti senti più a tuo agio in situazioni strutturate e organizzate o in contesti più aperti e adattabili?',
      options: ['Situazioni strutturate (Giudizio)', 'Contesti aperti (Percezione)'],
      dimensions: ['J', 'P']
    },
    {
      text: 'Sei più orientato a basarti sui fatti e sulla realtà concreta o a esplorare le possibilità future e le idee astratte?',
      options: ['Fatti concreti (Sensoriale)', 'Possibilità future (Intuitivo)'],
      dimensions: ['S', 'N']
    },
    {
      text: 'Nelle discussioni, sei più incline a seguire la logica e il pensiero razionale o a esprimere le tue emozioni e opinioni personali?',
      options: ['Logica e pensiero (Pensiero)', 'Emozioni e opinioni (Sentimento)'],
      dimensions: ['T', 'F']
    },
    {
      text: 'Quando pianifichi un viaggio, preferisci avere un itinerario dettagliato o lasciare spazio per l\'avventura e l\'improvvisazione?',
      options: ['Itinerario dettagliato (Giudizio)', 'Spazio per l\'avventura (Percezione)'],
      dimensions: ['J', 'P']
    },
    {
      text: 'Ti senti più stimolato da situazioni sociali e interazioni con gli altri o dalla riflessione e dalla solitudine?',
      options: ['Situazioni sociali (Estroverso)', 'Riflessione e solitudine (Introverso)'],
      dimensions: ['E', 'I']
    },
    {
      text: 'Sei più orientato verso la realtà tangibile e ciò che puoi toccare o verso le possibilità future e le idee astratte?',
      options: ['Realità tangibile (Sensoriale)', 'Possibilità future (Intuitivo)'],
      dimensions: ['S', 'N']
    },
    {
      text: 'Nelle tue decisioni, tendi a dare maggior peso alla logica e all\'obiettività o alle tue emozioni e ai tuoi valori personali?',
      options: ['Logica e obiettività (Pensiero)', 'Emozioni e valori (Sentimento)'],
      dimensions: ['T', 'F']
    }
  ];
  currentQuestionIndex: number = 0; // Inizia da 0

  currentQuestionNumber: number = 1;
  currentInterests: string[] = [];



  counters: { [key: string]: number } = {};
  selectedOptions: { [key: number]: number } = {};



  @ViewChild('formRef') formRef!: any;
  constructor(private router: Router) {
    // Inizializza i contatori basati sulle dimensioni delle domande
    this.questions.forEach(question => {
      question.dimensions.forEach(dimension => {
        this.counters[dimension] = 0;
      });
    });
  }

  selectOption(optionIndex: number) {
    this.selectedOptions[this.currentQuestionIndex] = optionIndex;
    this.updateCounters();

    // Verifica se siamo all'ultima domanda
    if (this.currentQuestionIndex === this.questions.length - 1) {
      // Siamo all'ultima domanda, quindi chiama onFormSubmit
      this.onFormSubmit();
    } else {
      // Altrimenti, avanza alla prossima domanda
      this.currentQuestionIndex++;
      this.currentQuestionNumber = this.currentQuestionIndex + 1;
    }
  }



  isSelected(questionIndex: number, optionIndex: number): boolean {
    return this.selectedOptions[questionIndex] === optionIndex;
  }









  // Funzione per aggiornare il contatore basato sulla risposta selezionata
  updateCounters() {
    // Resetta i contatori
    Object.keys(this.counters).forEach(dimension => {
      this.counters[dimension] = 0;
    });

    // Calcola i nuovi contatori basati sulle risposte selezionate
    Object.keys(this.selectedOptions).forEach(questionIndexKey => {
      const questionIndex = parseInt(questionIndexKey, 10); // Converte la chiave in un numero
      const optionIndex = this.selectedOptions[questionIndex];
      const dimension = this.questions[questionIndex].dimensions[optionIndex];
      this.counters[dimension] += 2;
    });
  }

  generatePersonalityString(): string {
    const letterE = this.counters['E'] > this.counters['I'] ? 'E' : 'I';
    const letterS = this.counters['S'] > this.counters['N'] ? 'S' : 'N';
    const letterT = this.counters['T'] > this.counters['F'] ? 'T' : 'F';
    const letterJ = this.counters['J'] > this.counters['P'] ? 'J' : 'P';

    return letterE + letterS + letterT + letterJ;
  }

  mbtiDestinations: Record<string, string> = {
    'ENFP': 'Tokyo, Giappone',
    'INTJ': 'Londra, Regno Unito',
    'ESFP': 'Bali, Indonesia',
    'ISTP': 'Patagonia, Argentina',
    'ESTJ': 'New York City, Stati Uniti',
    'ISFJ': 'Amsterdam, Paesi Bassi',
    'ENTJ': 'Singapore',
    'INFJ': 'Praga, Repubblica Ceca',
    'ESTP': 'Sydney, Australia',
    'ISFP': 'Costa Rica',
    'ENTP': 'Berlino, Germania',
    'INFP': 'Kyoto, Giappone',
    'ESFJ': 'Parigi, Francia',
    'INTP': 'Toronto, Canada',
    'ISTJ': 'Zurigo, Svizzera',
    'ENFJ': 'Barcellona, Spagna',

  };

   personalityDescriptions: Record<string, string> = {
    'ENFP': `Sei una persona creativa, spontanea ed entusiasta. Tokyo è una città straordinaria, un mix affascinante di tradizione e modernità. Qui puoi esplorare antichi templi, passeggiare tra grattacieli futuristici e assaporare delizie culinarie uniche. Troverai ispirazione ovunque, e la tua personalità vibrante si fonderà perfettamente con l'energia e la creatività di Tokyo.`,

    'INTJ': `Sei una persona intelligente, determinata e strategica. Londra è la città ideale per il tuo spirito ambizioso. Con le sue prestigiose università, il suo vivace settore finanziario e la sua storia affascinante, Londra ti offre infinite opportunità per imparare, crescere e realizzare i tuoi obiettivi. La tua determinazione troverà un ambiente perfetto in questa città multiculturale.`,

    'ESFP': `Sei una persona vivace, spontanea ed emotiva. Bali è un paradiso tropicale dove puoi abbandonare la routine quotidiana e abbracciare l'essenza della vita. Le spiagge mozzafiato, i templi spirituali e la cultura accogliente di Bali ti permetteranno di esplorare la tua creatività e di trovare una connessione profonda con te stesso. Questa isola magica risuonerà con la tua personalità spontanea.`,

    'ISTP': `Sei una persona pratica, avventurosa e analitica. La Patagonia offre un paesaggio epico di montagne imponenti, ghiacciai e vaste pianure, perfetto per l'avventuriero in te. Qui potrai mettere alla prova la tua resistenza fisica, esplorare la natura incontaminata e godere della tranquillità che solo luoghi remoti possono offrire.`,

    'ESTJ': `Sei una persona responsabile, organizzata e decisa. New York City è una città che premia l'impegno e la determinazione. Qui puoi perseguire la tua carriera, grazie alle numerose opportunità in vari settori. Allo stesso tempo, potrai immergerti nella cultura e nell'arte di livello mondiale che questa metropoli offre.`,

    'ISFJ': `Sei una persona calorosa, socievole e premurosa. Amsterdam è una città che abbraccia la diversità e promuove un senso di appartenenza. La sua atmosfera accogliente ti permette di stabilire connessioni significative con persone provenienti da tutto il mondo. Qui troverai spazi dedicati alla tua creatività e una cultura aperta verso nuove idee.`,

    'ENTJ': `Sei un leader naturale con una forte empatia. Singapore è una città che promuove l'innovazione e il progresso, ideale per coloro che desiderano fare la differenza. Connettiti con individui provenienti da diverse sfere della vita e sii ispirato dalle soluzioni sostenibili e tecnologiche avanzate di questa città.`,

    'INFJ': `Sei una persona riflessiva, spirituale e appassionata di cultura. Praga è una città di bellezza serena, ricca di storia e cultura. Qui potrai riflettere, connetterti con la spiritualità e godere di momenti di contemplazione. Scopri la bellezza delle cento guglie e dei vicoli accoglienti di questa città.`,

    'ESTP': `Sei una persona socievole e creativa con un desiderio di avventura. Sydney offre una combinazione di cultura, avventura e relax. Questa città ti invita a esplorare, a incontrare nuove persone e a godere di momenti spensierati sulla sua splendida costa.`,

    'ISFP': `Sei una persona amante della natura e avventurosa. La Costa Rica è un'esperienza ecologica straordinaria, con giungle lussureggianti, biodiversità unica e un impegno per lo sviluppo sostenibile. Qui puoi connetterti con la natura, abbracciare avventure uniche e contribuire alla conservazione dell'ambiente.`,

    'ENTP': `Sei una persona aperta mentalmente, creativa e desiderosa di innovare. Berlino è una città artistica, un hub culturale e un luogo dove le nuove idee prosperano. Esprimiti attraverso l'arte contemporanea, scopri la storia intrigante e partecipa alla scena creativa di questa città eclettica.`,

    'INFP': `Sei una persona romantica, appassionata e desiderosa di connessioni significative. Kyoto è una città che incarna l'essenza romantica del Giappone. Qui puoi creare legami profondi, celebrare momenti speciali e scoprire la bellezza e la spiritualità di antichi templi e giardini.`,

    'ESFJ': `Sei una persona calorosa, socievole e premurosa. Parigi è la città dell'amore e dell'ospitalità. Qui puoi creare connessioni profonde, godere di momenti romantici e condividere la passione per l'arte e la cultura. La "Città della Luce" risuonerà con la tua personalità affettuosa.`,

    'INTP': `Sei una persona curiosa, analitica e desiderosa di apprendere. Toronto è una città diversificata e cosmopolita che offre un ambiente ideale per esplorare nuove culture, idee innovative e spazi verdi rigeneranti. Soddisfa la tua sete di conoscenza nella città canadese.`,

    'ISTJ': `Sei una persona efficiente, stabile e determinata. Zurigo è nota per la sua efficienza, stabilità economica e bellezze naturali. Questa città offre un ambiente ideale per realizzare i tuoi obiettivi professionali e personali, combinando il mondo degli affari con la bellezza naturale svizzera.`,

    'ENFJ': `Sei una persona vivace, creativa e desiderosa di connessioni con gli altri. Barcellona è una città energica e accogliente, dove puoi esplorare l'arte straordinaria, gustare cibi deliziosi e connetterti con la cultura locale. Qui, potrai condividere momenti indimenticabili con persone provenienti da tutto il mondo.`,
  };

   personalityDestinations: Record<string, string[]> = {
    'ENFP': [
      'Tempio Senso-ji a Asakusa',
      'Distretto di Shibuya e Crossing',
      'Giardino Giapponese Rikugien',
      'Museo Ghibli'
    ],
    'INTJ': [
      'British Museum',
      'Torre di Londra',
      'Abazia di Westminster',
      'Museo Tate Modern'
    ],
    'ESFP': [
      'Tempio di Uluwatu',
      'Cascata Tegenungan',
      'Campuhan Ridge Walk a Ubud',
      'Spiaggia di Kuta'
    ],
    'ISTP': [
      'Parco Nazionale Nahuel Huapi',
      'Glaciar Perito Moreno',
      'Città di San Carlos de Bariloche',
      'Trekking a El Chaltén'
    ],
    'ESTJ': [
      'Times Square',
      'Central Park',
      'Statua della Libertà',
      'Metropolitan Museum'
    ],
    'ISFJ': [
      'Museo Van Gogh',
      'Anne Frank House',
      'Passeggiata lungo i canali',
      'Rijksmuseum'
    ],
    'ENTJ': [
      'Gardens by the Bay',
      'Marina Bay Sands SkyPark',
      'Singapore Zoo',
      'ArtScience Museum'
    ],
    'INFJ': [
      'Castello di Praga',
      'Ponte Carlo',
      'Quartiere ebraico di Praga',
      'Museo Nazionale di Praga'
    ],
    'ESTP': [
      'Opera House',
      'Sydney Harbour Bridge',
      'Spiaggia di Bondi',
      'Taronga Zoo'
    ],
    'ISFP': [
      'Parco Nazionale di Tortuguero',
      'Monteverde Cloud Forest Reserve',
      'Spiaggia di Manuel Antonio',
      'Vulcano Arenal'
    ],
    'ENTP': [
      'East Side Gallery',
      'Museo Pergamon',
      'Isola dei Musei',
      'Mercato di Mauerpark'
    ],
    'INFP': [
      'Tempio d\'argento',
      'Bambù Grove',
      'Kinkaku-ji (Pavilion of the Golden Pavilion)',
      'Gion, quartiere delle geishe'
    ],
    'ESFJ': [
      'Torre Eiffel',
      'Museo del Louvre',
      'Cattedrale di Notre-Dame',
      'Montmartre e Basilica del Sacro Cuore'
    ],
    'INTP': [
      'CN Tower',
      'Royal Ontario Museum',
      'Casa Loma',
      'Toronto Islands'
    ],
    'ISTJ': [
      'Lago di Zurigo',
      'Bahnhofstrasse',
      'Museo Nazionale Svizzero',
      'Monte Pilatus, vicino a Lucerna'
    ],
    'ENFJ': [
      'Basilica della Sagrada Familia',
      'Parc Güell',
      'La Rambla',
      'Casa Batlló'
    ]
  };







getPersonalityDescription(personalityType: string): string {
    return this.personalityDescriptions[personalityType] || 'Descrizione non disponibile';
  }


  getCounterKeys(): string[] {
    return Object.keys(this.counters);
  }

  onFormSubmit() {
    // Chiama generatePersonalityString per ottenere la stringa MBTI
    const mbtiString = this.generatePersonalityString();

    // Utilizza mbtiString come chiave per ottenere la descrizione della personalità dall'oggetto personalityDescription
    const personalityDescription = this.personalityDescriptions[mbtiString];

    // Utilizza mbtiString come chiave per ottenere la destinazione corrispondente dalla mappa
    const destination = this.mbtiDestinations[mbtiString];

    // Utilizza mbtiString come chiave per ottenere la lista delle destinazioni della personalità dall'oggetto personalityDestinations
    const personalityDestinations = this.personalityDestinations[mbtiString];
    this.currentInterests = this.personalityDestinations[mbtiString];


    // Effettua il reindirizzamento alla pagina dei risultati con la destinazione, la descrizione della personalità e le destinazioni della personalità
    this.router.navigate(['results'], {
      queryParams: {
        destination: destination,
        description: personalityDescription,
        personalityDestinations: personalityDestinations,
        interests: this.currentInterests
      },
    });
  }


}






