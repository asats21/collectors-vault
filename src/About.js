const About = () => {

  return (
    <div className="">

      {/* Header */}
      <div className="page-header mt-4 mt-md-2">
        <h1>About this project</h1>
      </div>

      <p>
        This app was created as a proof of concept, inspired by my experience in the space and what I believe rare sat collectors need.
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
        These tools don’t exist yet, but this project is a step toward that vision.
      </p>

      <p>
        Given my technical limitations, this project currently covers items 1, 2, and partially 3. To implement item 4, the site would need wallet connections to prove ownership and a permanent database.
      </p>

      <p style={{ textDecoration: "underline" }}>
        There’s no usage tracking, no API calls to third parties, and the data you enter stays on your device. 
        All the calculations and sat trait detection happen inside your browser.
      </p>

      <p>
        One small downside is that you’ll need to manually back up and restore your collection if you want to transfer it to another device.
      </p>

      <p>
        The code and ideas behind this project are free to use and reproduce, as it’s licensed under the <a href="https://unlicense.org/" target="_blank" rel="noopener noreferrer" style={{ color: "#C38BFA", textDecoration: "none", fontWeight: "bold" }}>Unlicense</a>,
        which means it drops all IP rights and allows you to do pretty much anything with it.
      </p>

      <p>
        The code is open-source and available on GitHub <a href="https://github.com/asats21/collectors-vault" target="_blank" rel="noopener noreferrer" style={{ color: "#C38BFA", textDecoration: "none", fontWeight: "bold" }}>here</a>. 
      </p>

      <p> 
        Special thanks to SatStats and Zed Zeroth, as well as the entire rare sat community and everyone who reached out to me after I launched the "Rare Stats" app. Your knowledge, ideas, and encouragement have been instrumental in my journey to building this app. 
      </p>

      <hr />

      <h3>Some ideas to take this further:</h3>
      <ul>
        <li><strong>Wallet connection</strong> – Enable users to connect their wallets for seamless collection management.</li>
        <li><strong>User database</strong> – Store collections so they persist across devices.</li>
        <li><strong>Collection scoring & appraisal</strong> – Implement a system to rank collections. Estimate the total value.</li>
        <li><strong>Leaderboards</strong> – Showcase top collectors.</li>
        <li><strong>Public collections</strong> – Let users showcase their collections and highlight notable sats.</li>
        <li><strong>Achievements</strong> – Add gamification elements with badges and milestones.</li>
        <li><strong>Marketplace integrations</strong> – Allow users to buy specific sats for their collections instantly within the app.</li>
        <li><strong>Supply & circulation API integration</strong> – Fetch real-time info about any given sat on the fly.</li>
        <li><strong>More visually appealing sat cards</strong> – Enhance UI to make collections even more engaging.</li>
        <li><strong>Pricing info & market caps</strong> – Provide valuation insights for different sats.</li>
      </ul>

      <p>
        If you share my vision and like these ideas, you are free to act. You don’t need any permissions or need to give me credit. Use this code in your apps. Monetize it if you want—it's open for anyone to build upon.</p>
      <p/>
        
      <p><strong>It’s up to us, the rare sats pioneers, to lay the foundation.</strong><br/> No one else will build it for us.</p>

    </div>
  );
};

export default About;