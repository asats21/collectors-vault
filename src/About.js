const About = () => {

  return (
    <div className="">
      <h1>About this project</h1>
      <p>
        This site was created as a proof of concept, based on my experience in the space and my thoughts on what rare sat collectors might need.
      </p>

      <p>
        Rare sat collectors need tools and services to:
      </p>
      
      <ul>
        <li>Onboard – help collectors choose what to collect</li>
        <li>Encourage – showcase collections and make them visually appealing</li>
        <li>Gamify – evaluate collections and score them</li>
        <li>Add a social aspect – enable public collections and leaderboards</li>
      </ul>

      <p>
        Unfortunately, we don’t have these tools yet.
      </p>

      <p>
        Due to my low technical skills, this project only covers items 1, 2, and maybe 3 to some extent. To implement item 4, the site would need wallet connections to prove ownership and a permanent database.
      </p>

      <p>
        There’s no usage tracking, no API calls to third parties, and the data you enter stays on your device. 
        All the calculations and sat trait detection happen inside your browser.
      </p>

      <p>
        One small downside is that you’ll need to manually back up and restore your collection if you want to transfer it to another device.
      </p>

      <p>
        The code and ideas behind this project are free to use and reproduce, as it’s licensed under the Unlicense, 
        which means it drops all IP rights and allows you to do pretty much anything with it.
      </p>

      <p>
        The code is open-source and available on GitHub <a href="https://github.com/asats21/collectors-vault" target="_blank" rel="noopener noreferrer">here</a>. 
      </p>

    </div>
  );
};

export default About;