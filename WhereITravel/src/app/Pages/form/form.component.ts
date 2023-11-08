
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




  questions: Question[] = [
    {
      text: 'Quando incontri nuove persone, ti senti più...',
      options: ['Energizzato ', 'Riflessivo '],
      dimensions: ['E', 'I']
    },
    {
      text: 'Quando prendi decisioni importanti, tendi a fare affidamento su...',
      options: ['Dati concreti ', 'Intuizioni '],
      dimensions: ['S', 'N']
    },
    {
      text: 'Nelle discussioni, sei più incline a seguire la tua...',
      options: ['Logica ', 'Cuore '],
      dimensions: ['T', 'F']
    },
    {
      text: 'Nel tuo lavoro, preferisci avere...',
      options: ['Struttura e pianificazione ', 'Flessibilità e adattabilità '],
      dimensions: ['J', 'P']
    },
    {
      text: 'Sei più propenso a...',
      options: ['Pianificare attentamente le attività ', "Lasciare spazio per l'improvvisazione "],
      dimensions: ['J', 'P']
    },
    {
      text: 'Ti piace passare il tempo con...',
      options: ['Molte persone ', 'Pochi amici intimi '],
      dimensions: ['E', 'I']
    },
    {
      text: 'Quando affronti un problema, solitamente segui il tuo...',
      options: ['Ragionamento ', 'Istinto '],
      dimensions: ['T', 'F']
    },
    {
      text: 'Preferisci situazioni in cui hai chiare...',
      options: ['Regole e struttura ', 'Flessibilità e apertura '],
      dimensions: ['J', 'P']
    },
    {
      text: 'Ti senti più a tuo agio con...',
      options: ['Fatti e dati concreti ', 'Concetti e idee astratte '],
      dimensions: ['S', 'N']
    },
    {
      text: 'Nelle relazioni, tendi a essere più...',
      options: ['Obiettivo e critico ', 'Empatico e comprensivo '],
      dimensions: ['T', 'F']
    },
    {
      text: 'Quando pianifichi un viaggio, preferisci...',
      options: ['Avere un itinerario dettagliato ', "Lasciare spazio per l'avventura "],
      dimensions: ['J', 'P']
    },
    {
      text: 'Ti senti più stimolato da...',
      options: ['Situazioni sociali e interazioni ', 'Riflessioni e solitudine '],
      dimensions: ['E', 'I']
    },
    {
      text: 'Sei più orientato verso...',
      options: ['La realtà tangibile ', 'Le possibilità future '],
      dimensions: ['S', 'N']
    },
    {
      text: 'Ti consideri più un...',
      options: ['Pianificatore ', 'Esploratore '],
      dimensions: ['P', 'J']
    },
    {
      text: 'Nelle tue decisioni, tendi a dare maggior peso...',
      options: ["Alla logica e all'obiettività ", 'Alle tue emozioni e ai valori personali '],
      dimensions: ['T', 'F']
    },

    {
      text: 'Quando sei con altre persone, preferisci essere al centro dell\'attenzione o rimanere più in disparte?',
      options: ['Centro dell\'attenzione ', 'Rimanere in disparte '],
      dimensions: ['E', 'I']
    },
    {
      text: 'Sei più orientato a concentrarti sui dettagli concreti o a immaginare possibilità future?',
      options: ['Dettagli concreti ', 'Possibilità future '],
      dimensions: ['S', 'N']
    },
    {
      text: 'Nelle decisioni, segui principalmente la logica e il ragionamento o ti basi su sentimenti ed emozioni personali?',
      options: ['Logica e ragionamento ', 'Sentimenti ed emozioni '],
      dimensions: ['T', 'F']
    },
    {
      text: 'Preferisci pianificare le tue attività in anticipo o ti piace mantenere la flessibilità e decidere al momento?',
      options: ['Pianificare in anticipo ', 'Mantenere la flessibilità '],
      dimensions: ['J', 'P']
    },
    {
      text: 'Ti senti più stimolato da situazioni sociali o momenti di solitudine e riflessione?',
      options: ['Situazioni sociali ', 'Solitudine e riflessione '],
      dimensions: ['E', 'I']
    },
    {
      text: 'Sei solito concentrarti su ciò che è già noto e concreto o ad abbracciare nuove idee e possibilità?',
      options: ['Concentrarti sul noto ', 'Abbracciare nuove idee '],
      dimensions: ['S', 'N']
    },
    {
      text: 'Nelle tue relazioni, tendi a essere obiettivo e critico o empatico e comprensivo?',
      options: ['Obiettivo e critico ', 'Empatico e comprensivo '],
      dimensions: ['T', 'F']
    },
    {
      text: 'Quando affronti un problema, preferisci seguire il tuo ragionamento e la tua analisi o affidarti all\'istinto e all\'intuizione?',
      options: ['Seguire ragionamento (Pensiero)', 'Affidarti all\'intuizione (Sentimento)'],
      dimensions: ['T', 'F']
    },
    {
      text: 'Ti senti più a tuo agio in situazioni strutturate e organizzate o in contesti più aperti e adattabili?',
      options: ['Situazioni strutturate ', 'Contesti aperti '],
      dimensions: ['J', 'P']
    },
    {
      text: 'Sei più orientato a basarti sui fatti e sulla realtà concreta o a esplorare le possibilità future e le idee astratte?',
      options: ['Fatti concreti ', 'Possibilità future '],
      dimensions: ['S', 'N']
    },
    {
      text: 'Nelle discussioni, sei più incline a seguire la logica e il pensiero razionale o a esprimere le tue emozioni e opinioni personali?',
      options: ['Logica e pensiero ', 'Emozioni e opinioni '],
      dimensions: ['T', 'F']
    },
    {
      text: 'Quando pianifichi un viaggio, preferisci avere un itinerario dettagliato o lasciare spazio per l\'avventura e l\'improvvisazione?',
      options: ['Itinerario dettagliato ', 'Spazio per l\'avventura '],
      dimensions: ['J', 'P']
    },
    {
      text: 'Ti senti più stimolato da situazioni sociali e interazioni con gli altri o dalla riflessione e dalla solitudine?',
      options: ['Situazioni sociali ', 'Riflessione e solitudine '],
      dimensions: ['E', 'I']
    },
    {
      text: 'Sei più orientato verso la realtà tangibile e ciò che puoi toccare o verso le possibilità future e le idee astratte?',
      options: ['Realità tangibile ', 'Possibilità future '],
      dimensions: ['S', 'N']
    },
    {
      text: 'Nelle tue decisioni, tendi a dare maggior peso alla logica e all\'obiettività o alle tue emozioni e ai tuoi valori personali?',
      options: ['Logica e obiettività ', 'Emozioni e valori '],
      dimensions: ['T', 'F']
    }
  ];
  currentQuestionIndex: number = 0;

  currentQuestionNumber: number = 1;
  currentInterests: string[] = [];



  counters: { [key: string]: number } = {};
  selectedOptions: { [key: number]: number } = {};



  @ViewChild('formRef') formRef!: any;
  constructor(private router: Router) {

    this.questions.forEach(question => {
      question.dimensions.forEach(dimension => {
        this.counters[dimension] = 0;
      });
    });
  }

  selectOption(optionIndex: number) {
    this.selectedOptions[this.currentQuestionIndex] = optionIndex;
    this.updateCounters();


    if (this.currentQuestionIndex === this.questions.length - 1) {

      this.onFormSubmit();
    } else {

      this.currentQuestionIndex++;
      this.currentQuestionNumber = this.currentQuestionIndex + 1;
    }
  }



  isSelected(questionIndex: number, optionIndex: number): boolean {
    return this.selectedOptions[questionIndex] === optionIndex;
  }










  updateCounters() {

    Object.keys(this.counters).forEach(dimension => {
      this.counters[dimension] = 0;
    });


    Object.keys(this.selectedOptions).forEach(questionIndexKey => {
      const questionIndex = parseInt(questionIndexKey, 10);
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

    const mbtiString = this.generatePersonalityString();


    const personalityDescription = this.personalityDescriptions[mbtiString];


    const destination = this.mbtiDestinations[mbtiString];


    const personalityDestinations = this.personalityDestinations[mbtiString];
    this.currentInterests = this.personalityDestinations[mbtiString];



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






