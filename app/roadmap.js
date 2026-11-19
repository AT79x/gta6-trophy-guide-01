// roadmapSteps is the road to the platinum, built from the official trophy
// descriptions: story chapters first, side-character finales next, then
// activities and collectibles, with 100% completion last. Each step names the
// trophies it covers so the checklist and the roadmap always agree.
export const roadmapSteps = [
  {
    title: 'Step 1 — Play the story, Chapters 1–4 + final mission',
    body: 'Complete Gone Fishing, then Chapters 1, 2, 3 and 4 and the final mission. This earns 12 story trophies, including the gold “You Gotta Know When to Get Off”. Do Lucia’s balcony meditation in Chapter 1 before the chapter ends (see the missable warning). Keep a manual save at the start of every chapter and one before the final mission — there is no mission replay.',
    trophies: ['Just Like Paradise', 'Paradise Lost', 'T**s Ass Drug Money', 'Vice City, Baby!', 'Top Of The World, Ma', 'You Gotta Know When to Get Off', 'Trust', 'Break the Bank', 'Family Matters', 'DWNFALL', 'Hi-Jacked', 'Snow Storm'],
  },
  {
    title: 'Step 2 — Side characters and strangers',
    body: 'Finish the final mission for Andy, Kenton, Billy, Randy and Tyrone, hunt Bret’s unique animal, and complete 8 stranger mission strands. These 7 trophies run alongside the story and in free roam after it.',
    trophies: ['Road to Rehabilitation', 'This Was No Boat Accident', 'The Lone Rider', 'Supply & Demand', 'Spin On This!', 'Fair Game', 'Strangers & Freaks'],
  },
  {
    title: 'Step 3 — Activities: races, range, fishing, bowling, arcade',
    body: 'Sample all 9 activity types (Master of None), win 20 different races, win a Top Fun Drone Race at all 14 locations, beat Cal at fishing, finish one arcade game and one bowling game at Kolt & Associates. Partner trophies go here too: lose a 4-star wanted level with your partner, and rob 3 shops back-to-back with your partner without losing the wanted level.',
    trophies: ['Master of None', 'Earn Cash, Not Kudos', 'Top Fun', 'Baited My Tackle', 'Stick Fiddler', 'Let’s Go Bowling', 'Hot Together', 'Retail Therapy'],
  },
  {
    title: 'Step 4 — Combat, crime and the long grinds',
    body: 'Gold all 42 Shooting Range challenges, pull off 250 stunts, rob 5 bank vaults, one armored truck and one illegal operation per gang (9 gangs), take down 5 enemies in one Combat Focus, and finish 50 challenges. These are the skill and repetition trophies — chip at them between other steps.',
    trophies: ['The Shootist', 'Cunning Stunts', 'Maximum Withdrawal', 'A Classic Blitz Play', 'Pest Control', 'Gunslinger', 'One Last Thing'],
  },
  {
    title: 'Step 5 — Collectibles and exploration',
    body: 'Meditate at all 18 spots (with both characters where possible), complete 3 Collectible Card sets, WAiNK It at 100 locations, explore all 52 areas of Leonida, discover 100 vehicles, buy all 8 garages and register 10 vehicles in the Scooter Bros app. The meditation trophy is the only missable one — its Chapter 1 spot is in Step 1.',
    trophies: ['Positive Mental Attitude', "Don't Touch My Deck", 'You WAiNKer!', 'The Goodtime State', 'Whip It Good', 'Little Boxes', 'On the Spot'],
  },
  {
    title: 'Step 6 — Money, oddities, then 100%',
    body: 'Launder $250,000 of Marked Bills, spend $100,000 across all shops, and mop up the one-off moments (Ocean Beach cocktail, showroom smash, Rhino tank, VCIA departure, jewelry store unseen, melee drive-by, second-try success, the strange event, and the choice and partnership moments). Then finish the 35-task 100% completion checklist for the gold “A Long Road” — and the platinum “Vice Got a Price!” pops with it.',
    trophies: ['Dime on the Dollar', 'Treat Yo Self', 'In The Beginning…', 'Capital Offense', 'Challenging Tank', 'Catch Me If You Can', 'Sneakthief', 'Ten Pin', 'Bad Luck, I Guess', 'The Truth Is Out There', 'Actions Speak Louder', 'Personal Best', 'A Long Road', 'Vice Got a Price!'],
  },
];

// renderRoadmap fills the ordered list on the page with the roadmap steps.
export function renderRoadmap(listElement) {
  listElement.replaceChildren();
  for (const step of roadmapSteps) {
    const li = document.createElement('li');
    const strong = document.createElement('strong');
    strong.textContent = step.title;
    const body = document.createElement('span');
    body.textContent = ' — ' + step.body;
    li.append(strong, body);
    listElement.append(li);
  }
}
