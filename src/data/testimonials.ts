export interface Testimonial {
  quote: string;
  name: string;
  relation: string;
  stars: number;
}

export const testimonials: Testimonial[] = [
  {
    quote: "Every coach we've encountered at Ballplex has been deeply invested in the athletes they train. Whether it's hitting, catching, pitching, or fielding, they tailor their instruction to your child's unique needs, building on their strengths while helping them grow in all aspects of the game. If you're a parent considering joining Ballplex, I can't recommend it enough.",
    name: "Lorena Brown",
    relation: "Athlete's Mom",
    stars: 5,
  },
  {
    quote: "Both girls have grown tremendously in balance and form, but most importantly in their confidence.",
    name: "Wes Herold",
    relation: "Athlete's Dad",
    stars: 5,
  },
  {
    quote: "Her mindset as a player has changed a lot. The coaches have done an excellent job both physically and mentally. On the field, she is able to make decisions by recalling the work done in her hitting lessons, showing a lot of confidence. She has made great progress and always maintains effective communication with her coach.",
    name: "Thelma Tortolo",
    relation: "Athlete's Mom",
    stars: 5,
  },
];
