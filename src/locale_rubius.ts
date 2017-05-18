var Res = {
    inviteLine1: "Join the game at",
    inviteLine3: "from your phone browser!",
    volumeOff: "&nbsp;&nbsp;OFF",
    Score: "PTS",
    HiNameChooseYourTeam: "Hi, <b>{name}</b>!<br/>Choose your team:",//hi, name, choose your team - choose-team-page
    HiNameYouAreInTeamChooseYourRole: "Привет, <b>{name}</b>!<br/>You are in <b>{team}</b>.<br/>Choose your role:", //hi, name, you are in team, choose your role - choose-position-page
    back:"Back", //back - change-name
    HiNameYouAreInATeamAndShouldAct: "Привет, <b>{name}</b>!<br/>Ты в команде <b>{team}</b>,<br/>и должен <b>{position}</b>.",    //hi, name, your are in team and have to act - controls-page
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
        ManageRole:'Руководить',
        ManageGood:'Хвалить',
        ManageBad:'Ругать',
        ShootRole:'Коммитить',
        Shoot:'Коммит!',
        TurretRole:'Проводить код-ревью',
        TurretLeft:'Принять',
        TurretRight:'Отклонить',
        MoveRole:'-move-',
        ForwardRole:'Писать новые фичи',
        Forward:'Написать фичу',
        BackwardRole:'Переписывать всё заново',
        Backward:'Переписать заново',
        TurnRole:'-turn-',
        LeftRole:'Делать как С.Ю.',
        Left:'Сделать как С.Ю.',
        RightRole:'Делать как С.Е.',
        Right:'Сделать как С.Е.'
    },

    ManagerGoodPhrases: [
        "Вперёд!",
        "Так держать!",
        "Молодцы!",
        "Всем по премии!",
        "Коэффициент 1,5 каждому!",
        "Больше плюшек!",
        "Страна вами гордится!",
        "Гагарин вами бы гордился!",
        "Чувствуется русская инженерная школа!",
        "Быстрее! Выше! Сильнее!",
        "Вместе мы – сила!",
        "Заказчики счастливы!"
    ],
    ManagerBadPhrases: [
        "Кто вас такому учил?",
        "Срываем все сроки!",
        "Всех уволить!",
        "Ты работаешь хуже Семёна!",
        "Коэффициент 0,5 каждому!",
        "Вы позорите Родину!",
        "Ну, соберитесь уже!",
        "Вы – слабое звено!",
        "Гагарин смог, а вы – нет...",
        "Это пятиминутная задача!",
        "Перехвалил!",
        "А всё потому, что устав не читали!",
        "А что скажет заказчик?"
    ],

    generatedNamesAdjectives: 
        ["агрессивный",
        "безрассудный",
        "бескомпромиссный",
        "отважный",
        "неуловимый",
        "неустрашимый",
        "благоразумный",
        "дерзкий",
        "воинственный",
        "непревзойденный",
        "свирепый",
        "злопамятный",
        "яростный",
        "темпераментный",
        "доблестный",
        "выдающийся",
        "неотразимый",
        "мечтательный",
        "образцовый",
        "добродушный"],
    generatedNamesNouns:
        ["стратег",
        "девелопер",
        "тестировщик",
        "менеджер",
        "кодер",
        "архитектор",
        "военачальник",
        "теоретик",
        "идеалист",
        "агитатор",
        "стажер",
        "хакер",
        "исследователь",
        "экспериментатор",
        "лидер"],
    
}

export default Res;
