export const demoSteps = [
  {
    id: 1,
    key: "accroche",
    badge: "Étape 1 · Le Constat",
    title: "Vous envoyez vos devis, mais certains clients ne répondent jamais ?",
    subtitle: "Après une longue journée de chantier, relancer chaque client un par un est la dernière chose qu'on a le temps de faire le soir.",
    durationSec: 18,
    problemCards: [
      {
        icon: "FileQuestion",
        title: "Des devis oubliés",
        description: "Sans relance rapide, vos chiffrages restent au fond de la boîte mail de vos clients et finissent aux oubliettes."
      },
      {
        icon: "UserX",
        title: "Des clients sans nouvelles",
        description: "Vos prospects hésitent, attendent ou sont occupés. Sans nouvelles de votre part, le lien s'estompe."
      },
      {
        icon: "Clock",
        title: "Des relances chronophages",
        description: "Téléphoner ou écrire un message personnalisé après 18h prend une énergie précieuse sur votre vie personnelle."
      },
      {
        icon: "TrendingDown",
        title: "Des opportunités perdues",
        description: "Un concurrent plus prompt à relancer récupère le chantier, simplement parce qu'il a repris contact au bon moment."
      }
    ],
    highlightStat: {
      value: "1 devis sur 2",
      label: "n'est jamais relancé faute de temps le soir après le chantier"
    }
  },
  {
    id: 2,
    key: "solution",
    badge: "Étape 2 · La Solution",
    title: "ZÉDIA vous aide à ne plus laisser vos devis sans suivi.",
    subtitle: "Une application française pensée spécialement pour le rythme des artisans et TPE du bâtiment : sobre, sans jargon et active en 30 secondes.",
    durationSec: 20,
    pillars: [
      {
        number: "01",
        title: "Ventilation financière automatique",
        badge: "HT · TVA · TTC",
        description: "Enregistrez votre montant : ZÉDIA ventile seul les taux de TVA du bâtiment (5,5 %, 10 %, 20 %) et le Hors Taxes. Aucune calculatrice requise."
      },
      {
        number: "02",
        title: "Relances au nom de votre atelier",
        badge: "Courtoises & Sobres",
        description: "Les e-mails partent avec le nom de votre entreprise. Votre client peut répondre directement ou valider son devis en 1 clic."
      },
      {
        number: "03",
        title: "Arrêt 100% automatique",
        badge: "Sécurité anti-relance",
        description: "Dès que le client répond au mail ou clique sur un bouton, ZÉDIA coupe immédiatement les relances suivantes. Zéro doublon garanti."
      }
    ],
    verifiedStats: [
      { value: "+38 %", label: "de devis signés grâce à un suivi régulier à J+3 et J+7" },
      { value: "30 sec", label: "pour enregistrer un devis et programmer ses relances" },
      { value: "100 %", label: "des réponses clients reçues sur votre propre messagerie" },
      { value: "0 €", label: "pour démarrer sans carte bancaire (3 devis actifs)" }
    ]
  },
  {
    id: 3,
    key: "demonstration",
    badge: "Étape 3 · Démonstration Visuelle",
    title: "Comment fonctionne ZÉDIA au quotidien ?",
    subtitle: "Découvrez en images réelles les 5 étapes simples et concrètes au cœur de la plateforme.",
    durationSec: 35,
    substeps: [
      {
        id: "sub-1",
        stepNumber: "01",
        tabTitle: "1. Espace & Répertoire",
        heading: "Ajouter un client en 10 secondes",
        explanation: "Accédez à votre espace artisan épuré. Dans le Répertoire Clients, renseignez simplement le nom, l'e-mail et le téléphone de votre client. Sa fiche est immédiatement prête et réutilisable pour tous ses futurs projets.",
        image: "/screenshots/02_clients_list.png",
        callout: "Centralisation de vos contacts pour ne plus jamais chercher un numéro le soir.",
        tags: ["Répertoire client", "Saisie 10 sec", "Historique centralisé"]
      },
      {
        id: "sub-2",
        stepNumber: "02",
        tabTitle: "2. Créer un devis",
        heading: "Enregistrer le devis & ventilation HT / TVA",
        explanation: "Sélectionnez votre client et entrez le montant TTC. ZÉDIA calcule instantanément le Hors Taxes selon le taux de TVA choisi (10 % rénovation, 20 % standard, 5,5 % énergie). Vous pouvez associer une étiquette couleur métier (Urgent, Priorité Haute) et une note interne 100% privée.",
        image: "/screenshots/04_devis_form_filled.png",
        callout: "Calcul HT / TVA 100% automatique et étiquette métier pour classer vos dossiers.",
        tags: ["TVA 5,5% / 10% / 20%", "Étiquettes couleur", "Note privée confidentielle"]
      },
      {
        id: "sub-3",
        stepNumber: "03",
        tabTitle: "3. Programmer relances",
        heading: "Suivi automatique cadencé (J+3, J+7, J+14)",
        explanation: "ZÉDIA programme automatiquement la cadence optimale de suivi : J+3 (prise de contact courtoise) et J+7 (point de planification). Vous cochez simplement l'envoi immédiat et cliquez sur « Programmer les relances ». Vous n'avez plus rien d'autre à faire.",
        image: "/screenshots/05_devis_list_active.png",
        callout: "Votre planning de relance tourne en arrière-plan pendant que vous êtes sur vos chantiers.",
        tags: ["Cadence J+3 · J+7", "Zéro relance en doublon", "Esprit tranquille"]
      },
      {
        id: "sub-4",
        stepNumber: "04",
        tabTitle: "4. E-mail client & Arrêt",
        heading: "L'e-mail reçu par le client & Décision en 1 clic",
        explanation: "Votre prospect reçoit un courriel impeccable expédié au nom de votre entreprise. Il peut cliquer sur « Accepter ce devis », « Décliner » ou répondre par e-mail. Dès action, ZÉDIA coupe instantanément les relances et achemine la réponse dans votre boîte mail habituelle (Gmail, Outlook, Orange...).",
        isInteractiveEmail: true,
        callout: "⚡ Sécurité anti-relance certifiée : Zéro e-mail envoyé à un client qui a déjà donné suite.",
        tags: ["Validation en 1 clic", "Réponse sur votre messagerie", "Arrêt instantané"]
      },
      {
        id: "sub-5",
        stepNumber: "05",
        tabTitle: "5. Pilotage & Comptabilité",
        heading: "Suivi du CA accepté & Export CSV comptable",
        explanation: "Visualisez en un clin d'œil l'évolution de votre chiffre d'affaires signé avec la courbe mensuelle (HT, TTC, cumulé). En un clic sur « Exporter en CSV », téléchargez un fichier prêt pour votre logiciel comptable ou votre expert-comptable.",
        image: "/screenshots/07_dashboard_overview_kpis.png",
        callout: "Visibilité totale sur votre activité et transmission propre des chiffres en fin de mois.",
        tags: ["Courbe CA mensuelle", "Export Excel / CSV", "Conseiller ZÉDIA disponible"]
      }
    ]
  },
  {
    id: 4,
    key: "benefices",
    badge: "Étape 4 · Les Bénéfices",
    title: "Ce que ZÉDIA change concrètement pour votre atelier",
    subtitle: "Des résultats tangibles sur votre quotidien d'artisan, sans promesses financières extravagantes.",
    durationSec: 20,
    benefitsList: [
      {
        title: "Moins de temps sur les relances le soir",
        detail: "Plus besoin d'ouvrir vos e-mails fatigué à 20h pour chercher qui relancer. Le système s'exécute avec rigueur et politesse."
      },
      {
        title: "Un suivi commercial clair et structuré",
        detail: "Finis les devis éparpillés sur un calepin ou dans un tableur obsolète : chaque dossier a son statut visible en un coup d'œil."
      },
      {
        title: "Moins de devis laissés sans réponse",
        detail: "Grâce aux rappels bienveillants à J+3 et J+7, vos clients reprennent contact et concrétisent leurs chantiers."
      },
      {
        title: "Réception directe sur votre boîte e-mail habituelle",
        detail: "Aucune nouvelle messagerie à surveiller : les réponses de vos clients arrivent sur votre boîte habituelle (Gmail, Orange, Outlook...)."
      },
      {
        title: "Plus de sérénité sur vos chantiers",
        detail: "Vous pouvez vous concentrer à 100 % sur la pose, le conseil technique et la satisfaction de vos clients sur le terrain."
      }
    ],
    quote: {
      text: "« Avant ZÉDIA, j’oubliais de relancer un devis sur deux par manque de temps le soir. Dès le premier mois, deux clients m’ont répondu dès la relance à J+3 pour valider leur chantier de menuiserie. »",
      author: "Julien Mercier",
      role: "Menuiserie Mercier & Fils (Nantes) · Utilisateur ZÉDIA"
    }
  },
  {
    id: 5,
    key: "cta",
    badge: "Étape 5 · Conclusion & Action",
    title: "Et si vous ne laissiez plus vos devis sans suivi ?",
    subtitle: "Découvrez ZÉDIA gratuitement sur vos 3 prochains devis, sans carte bancaire et sans engagement de durée.",
    durationSec: 15,
    plans: [
      {
        name: "Offre Découverte",
        price: "0,00 €",
        frequency: "par mois · Sans engagement",
        features: [
          "Jusqu’à 3 clients & 3 devis actifs suivis simultanément",
          "Relances programmées (J+3, J+7, J+14)",
          "Boutons de réponse directe pour le client",
          "Ventilation automatique HT / TVA (5,5 %, 10 %, 20 %)",
          "Export CSV & Conseiller ZÉDIA inclus"
        ],
        ctaText: "Découvrir ZÉDIA gratuitement",
        ctaHref: "https://zedia-devis.ai.studio",
        badge: "Recommandé pour démarrer"
      },
      {
        name: "ZÉDIA Atelier Pro",
        price: "29,00 € HT",
        frequency: "par mois · Sans engagement",
        features: [
          "Clients, devis et relances automatiques illimités",
          "Boutons d'action client en 1 clic dans chaque courriel",
          "Étiquettes personnalisées & notes internes confidentielles",
          "Courbe de CA (HT / TTC / Cumulé) & TVA bâtiment",
          "Conseiller ZÉDIA illimité & support prioritaire"
        ],
        ctaText: "Découvrir l'offre Atelier Pro",
        ctaHref: "https://zedia-devis.ai.studio",
        badge: "Pour activité régulière"
      }
    ]
  }
];
