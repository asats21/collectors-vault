## About this project

This site was created as a proof of concept, based on my experience in the space and my thoughts on what rare sat collectors might need.

Rare sat collectors need tools and services to:

- **Onboard** – help collectors choose what to collect  
- **Encourage** – showcase collections and make them visually appealing  
- **Gamify** – evaluate collections and score them  
- **Add a social aspect** – enable public collections and leaderboards  

Unfortunately, we don’t have these tools yet.

This project only covers items 1, 2, and maybe 3 to some extent. To implement item 4, the site would need wallet connections to prove ownership and a permanent database.

**There’s no usage tracking, no API calls to third parties, and the data you enter stays on your device.**  
All the calculations and sat trait detection happen inside your browser.

## Book difficulty Levels

* **Novice**: Entry-level, easy for beginners.

* **Collector**: For those who have some experience.

* **Expert**: High difficulty, for seasoned collectors.

* **Elite**: Top difficulty, for seasoned wealthy collectors.

* **Zenite**: Extremely rare, maybe only a few hundred people can achieve it.

## How to spin up your own version 101

0) make sure you have Node.js installed on your system (I used node v18.7.0 & npm 8.18.0)
1) fork the repo
2) navigate to your project folder ```cd your-repo-name```
3) change ```"homepage": "https://asats21.github.io/collectors-vault",``` to ```"homepage": "https://your-username.github.io/your-repo-name",```
4) run ```npm install```
5) run ```npm start``` to see your project locally
6) run ```npm run deploy``` to push your changes to your app on the web

Note: if you encounter any strange errors while running locally or deploying, try running ```export NODE_OPTIONS=--openssl-legacy-provider```

## App URL
https://asats21.github.io/collectors-vault

## License

This project is licensed under [The Unlicense](LICENSE). This means you are free to copy, modify, and distribute the code for any purpose without restriction. See the [LICENSE](LICENSE) file for more details.