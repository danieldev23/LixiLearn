
export const grammarData = {
  partOfSpeech: [
    {
      id: 'nouns',
      name: 'Nouns',
      sections: [
        {
          id: 'definition',
          title: 'Definition',
          content: 'A noun is a word that names a person, place, thing, or idea. Nouns can be subjects of sentences, objects, or even show possession.',
          examples: [
            { text: 'Boy', category: 'Person', emoji: '👦' },
            { text: 'House', category: 'Place', emoji: '🏠' },
            { text: 'Phone', category: 'Thing', emoji: '📱' },
            { text: 'Happiness', category: 'Idea', emoji: '💡' },
          ]
        },
        {
          id: 'types',
          title: 'Types of Nouns',
          subsections: [
            {
              id: 'common-proper',
              title: 'Common and Proper Nouns',
              content: 'Common nouns: General names of people, places, or things.',
              examples: [
                { text: 'car', emoji: '🚗' },
                { text: 'book', emoji: '📘' },
                { text: 'school', emoji: '🏫' },
              ],
              content2: 'Proper nouns: Specific names, always capitalized.',
              examples2: [
                { text: 'Tesla', emoji: '⚡' },
                { text: 'Harry Potter', emoji: '📚' },
                { text: 'New York', emoji: '🗽' },
              ]
            },
            {
              id: 'countable-uncountable',
              title: 'Countable and Uncountable Nouns',
              content: 'Countable nouns: Can be counted, and have singular and plural forms.',
              examples: [
                { text: 'apple/apples', emoji: '🍎' },
                { text: 'chair/chairs', emoji: '🪑' },
              ],
              content2: 'Uncountable nouns: Cannot be counted individually.',
              examples2: [
                { text: 'water', emoji: '💧' },
                { text: 'air', emoji: '💨' },
                { text: 'music', emoji: '🎵' },
              ]
            },
            {
              id: 'concrete-abstract',
              title: 'Concrete and Abstract Nouns',
              content: 'Concrete nouns: Physical objects that can be observed with the senses.',
              examples: [
                { text: 'table', emoji: '🪑' },
                { text: 'flower', emoji: '🌸' },
              ],
              content2: 'Abstract nouns: Concepts, ideas, qualities, or feelings.',
              examples2: [
                { text: 'love', emoji: '❤️' },
                { text: 'freedom', emoji: '🕊️' },
                { text: 'courage', emoji: '🦁' },
              ]
            }
          ]
        },
      ]
    },
    // Other parts of speech would be added here
  ]
};