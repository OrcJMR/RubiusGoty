var Res = {
    inviteLine1: "Join the game at",
    inviteLine3: "from your phone browser!",
    volumeOff: "&nbsp;&nbsp;OFF",
    Score: "PTS",
    HiNameChooseYourTeam: "Hi, <b>{name}</b>!<br/>Choose your team:",//hi, name, choose your team - choose-team-page
    HiNameYouAreInTeamChooseYourRole: "Hey, <b>{name}</b>!<br/>You are in <b>{team}</b>.<br/>Choose your role:", //hi, name, you are in team, choose your role - choose-position-page
    back:"Back", //back - change-name
    HiNameYouAreInATeamAndShouldAct: "Hey, <b>{name}</b>!<br/>You're on <b>{team}</b>,<br/>and are going to <b>{position}</b>.",    //hi, name, your are in team and have to act - controls-page
    EnterYourName: "Enter your name", //enter your name - login-page
    Enter: "Enter",//enter - login-page
    KickAll: "Kick All",//- server-info
    StartGame: "Start game",//- server-info
    Name: "Name",//- server-info

    Teams: [
        "Team Gold",
        "Team Purple",
        "Team Jade"
    ],
    TeamStyles: [
        "gold",
        "#9c27b0",
        "#4CAF50"
    ],

    Roles: {
        ManageRole:'Manage',
        ManageGood:'Praise',
        ManageBad:'Scold',
        ShootRole:'Commit code',
        Shoot:'Commit!',
        TurretRole:'Review code',
        TurretLeft:'Accept',
        TurretRight:'Reject',
        MoveRole:'-move-',
        ForwardRole:'Implement new features',
        Forward:'Write a feature',
        BackwardRole:'Rework old stuff',
        Backward:'Rewrite anew',
        TurnRole:'-turn-',
        LeftRole:'Do this was',
        Left:'Do this way',
        RightRole:'Do that way',
        Right:'Do that way'
    },

    ManagerGoodPhrases: [
        "Engage!",
        "Keep at it!",
        "Great job guys!",
        "Everyone gets a bonus!",
        "Bonus coefficient 1.5 for everyone!",
        "More benefits!",
        "You make the country proud!",
        "Even Gagarin would be proud!",
        "Ah, Russian engineering!",
        "Faster! Higher! Stronger!",
        "Together we are the power!",
        "Our customers are happy!"
    ],
    ManagerBadPhrases: [
        "Who taught you that?",
        "We're past our dealines!",
        "I will fire every goddamn last one of ya!",
        "You're worse than our bad guy!",
        "Bonus coefficient 0.5 for everyone!",
        "The country is ashamed of you!",
        "Get your s...elf together!",
        "You are the Weakest link!",
        "Gagarin could, but you couldn't...",
        "That's a five minute task!",
        "I've over-praised you!",
        "Did you even read the company mission?",
        "Think of what the customer will say..."
    ],

    generatedNamesAdjectives: 
        ["aggressive",
        "reckless",
        "daredevil",
        "uncompromising",
        "courageous",
        "elusive",
        "intrepid",
        "thoughtful",
        "audacious",
        "warmonging",
        "unequaled",
        "raging",
        "vindictive",
        "furious",
        "hot",
        "valiant",
        "exceptional",
        "irresistible",
        "dreaming",
        "exemplary",
        "good-natured"],
    generatedNamesNouns:
        ["strategist",
        "developer",
        "tester",
        "manager",
        "coder",
        "architect",
        "warlord",
        "theorycrafter",
        "idealist",
        "agitator",
        "trainee",
        "hacker",
        "explorer",
        "experimenter",
        "leader"],
    
}

export default Res;
