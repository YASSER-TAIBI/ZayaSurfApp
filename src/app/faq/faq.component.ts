import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface FaqTab {
  id: string;
  label: string;
}

interface FaqItem {
  question: string;
  answer: string;
  bullets?: string[];
}

@Component({
  selector: 'app-faq',
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  tabs: FaqTab[] = [
    { id: 'surfing', label: 'Surfing' },
    { id: 'travel', label: 'Travel information' },
    { id: 'meals', label: 'Meals' },
    { id: 'things', label: 'Things to take with you' },
    { id: 'location', label: 'Location' },
    { id: 'other', label: 'Other' }
  ];

  activeTab = 'surfing';

  faqContent: Record<string, FaqItem[]> = {
    surfing: [
      {
        question: "I'M A COMPLETE BEGINNER - IS THAT OK?",
        answer:
          "Never been surfing before? Don't worry, our surf coaches are experienced in teaching surfers of all levels. Catch your first wave with us!"
      },
      {
        question: 'DO YOU OFFER LESSONS FOR DIFFERENT LEVELS?',
        answer:
          'Yes, of course! We offer surf lessons for all levels, from beginners to advanced intermediate surfers who want to improve their technique and wave count.'
      },
      {
        question: 'WHAT ARE THE SPOTS IN MOROCCO?',
        answer:
          'Surfing in Morocco can be done all year round, so no time is a bad time to visit. There are more than 15 surf spots within easy reach, ranging from beach spots to the more famous and challenging point breaks. We are located in such a location that some spots can be reached on foot, others can be reached by car.'
      },
      {
        question: 'WHEN IS THE BEST TIME TO SURF IN MOROCCO?',
        answer:
          'Theoretically, our region has waves all year round, but their size and frequency varies throughout the year. We believe that the ideal time of year to visit depends on your level of surfing, please see our recommendations below:',
        bullets: [
          'Beginners: all year round',
          'Intermediate: September - May',
          'Advanced: November to March'
        ]
      },
      {
        question: 'HOW LONG DO THE LESSONS LAST?',
        answer:
          'Our surf lessons take place daily, in the morning and last 2 hours, including a warm-up and theory of surfing on the beach. The lesson is followed by 2 hours of supervised practice.'
      },
      {
        question: 'HOW MANY PEOPLE WILL BE IN MY GROUP?',
        answer:
          'We keep a low ratio in our surfing lessons - up to 6 students per instructor. We believe this gives you a better chance of progress through more attention and individual feedback.'
      }
    ],
    travel: [
      {
        question: 'DO I NEED VISA?',
        answer:
          'European passport holders do not require a visa for tourist entry into Morocco, you will receive a tourist visa for 90 days on entry, for all other citizens we recommend that you contact the nearest Moroccan embassy. Please note that your passport must be valid for at least 6 months after your return date.'
      },
      {
        question: 'MONEY - WHICH CURRENCY?',
        answer:
          'The Moroccan Dirham (MAD) is the currency of Morocco and is officially a closed currency, but you can exchange money before arrival at some major airports, or you can find currency exchange offices and ATMs at Agadir and Marrakech airports upon arrival. There is also ATM close to our villa.'
      },
      {
        question: 'WHAT ABOUT INSURANCE?',
        answer:
          'Taking out travel insurance before your trip is your responsibility. We require all clients of Desert Surf Morocco to be fully insured, we are not responsible for injury to persons.'
      },
      {
        question: 'DO I NEED TO GET ANY VACCINATIONS FOR MOROCCO?',
        answer:
          'No special vaccinations are required for Morocco (COVID vaccination as well as PCR are not required too)'
      },
      {
        question: 'IS THERE WIFI HERE? WHAT ELECTRICAL SOCKETS ARE USED IN MOROCCO?',
        answer:
          'Free WIFI is available in our camp. Morocco is powered by 220 volts with two-pin round plugs, like in Europe.'
      }
    ],
    meals: [
      {
        question: 'WHAT IF I HAVE A SPECIAL DIET?',
        answer:
          'Vegetarians, vegans, people with gluten intolerance, allergies... no problem, our team is ready to meet all your needs. Just let us know at the time of booking and we will make everything according to your wishes.'
      },
      {
        question: 'WHAT WATER CAN I DRINK?',
        answer:
          'Please note that we do not recommend drinking tap water - we provide filtered water for our guests.'
      },
      {
        question: 'IS IT SAFE TO DRINK ALCOHOL DRINKS?',
        answer:
          'In the city of Agadir you can buy alcohol beverages in some supermarkets and a number of restaurants and bars that serve alcohol drinks. Also there are some bars in Taghazout and Tamraght that serves alcohol drinks. You can consume alcohol beverages in our camp while enjoying some sunbathing on the rooftop terrace after surfing.'
      }
    ],
    things: [
      {
        question: 'WHAT DO I NEED TO TAKE WITH ME?',
        answer:
          'Here are some of the must-haves we suggest you bring: sunscreen (waterproof), sunglasses, hat/cap, beach towel, flip-flops.'
      },
      {
        question: 'DO I NEED TO BRING MY OWN TOWELS?',
        answer:
          'We provide you with shower towels, but you will need to bring your own beach towel or take a towel for rent.'
      },
      {
        question: 'WHAT CLOTHES SHOULD I BRING WITH ME?',
        answer:
          'Morocco is a liberal Muslim country, in the area we are in it is not uncommon for men and women to dress in shorts and T-shirts. On the beach you will see men in bathing shorts and women in bikinis, but there is no nudity here. Bring plenty of beachwear and we suggest you also bring a pair of jumpers and jeans for the evening, as the temperature drops a bit at this time, especially in winter.'
      }
    ],
    location: [
      {
        question: 'WHERE IS DESERT SURF MOROCCO LOCATED?',
        answer:
          'Desert Surf Morocco is located in the coastal village of Tamraght, just 14km north of Agadir, a forty-minute drive from Agadir International Airport and 2km from the bustling tourist centre of Taghazout.'
      },
      {
        question: 'HOW TO GET TO THE CAMP?',
        answer:
          'The nearest airport is Agadir Al Massira, well connected by air to many cities in Morocco and Europe, with a wide range of airlines. There are also flights to Marrakech airport (three and a half hours away) or Essaouira (two and a half hours away), Casablanca and Rabat. More information can be found here.'
      },
      {
        question: 'ARE AIRPORT/BUS STATION TRANSFERS INCLUDED?',
        answer:
          'We offer a free transfer from Agadir Airport or Agadir Bus Station for stays of 10 nights or more. For stays of less than 10 nights, we can arrange a transfer for an additional fee.'
      },
      {
        question: 'WHAT IS IN TAMRAGHT?',
        answer:
          'The village of Tamraght has many cafés and restaurants offering both typical Moroccan and vegan cuisine. There are more coastal restaurants, usually specialising in seafood, within a 10-minute walk of the beach. There are plenty of grocery shops selling seasonal fruit, vegetables and other necessities, as well as a good pharmacy and four surf shops.'
      }
    ],
    other: [
      {
        question: 'CAN I COME ANY DAY OF THE WEEK?',
        answer:
          'We have no set arrival or departure days, so you can come any day of the week and stay for any length of time but minimum 4 nights. We recommend that you stay for at least a week to get the most out of your surfing experience with us.'
      },
      {
        question: 'WHAT IS THE WEATHER LIKE IN MOROCCO?',
        answer:
          "Morocco has more than 330 days of sunshine a year, so daytime clothing consists of shorts, T-shirts and flip-flops. As the sun goes down, however, it gets chilly, so it's worth bringing a pair of jeans and a sweatshirt (especially in the winter months)."
      }
    ]
  };

  get activeFaqs(): FaqItem[] {
    return this.faqContent[this.activeTab] ?? [];
  }

  get activeTabLabel(): string {
    return this.tabs.find((tab) => tab.id === this.activeTab)?.label ?? '';
  }

  selectTab(tabId: string): void {
    this.activeTab = tabId;
  }
}
