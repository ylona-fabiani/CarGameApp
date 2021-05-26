class SuivreVoiture
{
    constructor()
    {
        this.bPonctuel = false;
        this.temps = Math.floor(Math.random() * 420) + 240;
        this.frequence = 5;
    }

    randomize()
    {
        this.temps = Math.floor(Math.random() * 420) + 240;
    }

    getAction()
    {
        const couleurs = [ 'Rouge', 'Bleu', 'Orange', 'Jaune', 'Vert'];
        const couleur = couleurs[Math.floor(Math.random() *  couleurs.length  )];
        return 'Suis la première voiture ' + couleur + ' que tu vois';
    }
}

class Action
{

    textnode;
    constructor(action)
    {
        this.action = action;
        this.deleteButton = document.createElement("button");
        this.deleteButton.innerText = '-';
        this.divAction = document.createElement("div");
        this.divAction.innerText = action.getAction();
        this.divAction.appendChild(this.deleteButton);

        if ( this.action.bPonctuel )
        {
            document.getElementById('actionList').appendChild(this.divAction);
            this.deleteButton.addEventListener("click", this.onDelete.bind(this));
        }

        else
        {
            this.timer = action.temps;
            this.deleteButton.addEventListener("click", this.onDelete.bind(this));
            this.textnode = document.createTextNode(this.timer);
            console.log('a : ' + this.textnode);
            this.divAction.appendChild(this.textnode);
            document.getElementById('actionList').appendChild(this.divAction);
            this.interval = setInterval(this.onTick.bind(this), 1000);
            this.action.randomize();
        }
    }

    onDelete(event)
    {
        this.divAction.remove();
        if ( !this.action.bPonctuel )
            clearInterval(this.interval);
    }

    onTick()
    {
        console.log(this.timer)
        this.textnode.nodeValue = this.timer;
        if ( this.timer === 0)
        {
            clearInterval(this.interval);
        }
        this.timer--;
    }
}


let autoroute = [
    {bPonctuel: false, temps: Math.floor(Math.random() * 300 ) + 300, frequence: 1, getAction: function(){return 'Le passager tient le volant'}, randomize: function(){this.temps = Math.floor(Math.random() * 300 ) + 300 }},
    {bPonctuel: false, temps: Math.floor(Math.random() * 120 ) + 120, frequence: 1, getAction: function(){return 'Pas le droit de dépasser'}, randomize: function(){this.temps = Math.floor(Math.random() * 120 ) + 120 }},
    {bPonctuel: true, temps: 0, frequence: 25, getAction: function(){return 'Sors à la prochaine sortie'}},
];
let ville = [
    {bPonctuel: true, temps: 0, frequence: 25, getAction: function(){return 'Tourner à droite'}},
    {bPonctuel: true, temps: 0, frequence: 25, getAction: function(){return 'Tourner à gauche'}},
    {bPonctuel: true, temps: 0, frequence: 25, getAction: function(){return 'Tout droit pd'}},
    {bPonctuel: true, temps: 0, frequence: 2, getAction: function(){return 'Prochain rond-point : demi tour'}},
    {bPonctuel: true, temps: 0, frequence: 1, getAction: function(){return 'Le plus PD conduit'}},
    {bPonctuel: true, temps: 0, frequence: 1, getAction: function(){return '3e intersection tu tournes pd'}},
    {bPonctuel: true, temps: 0, frequence: 1, getAction: function(){return 'Demi-tour dès que possible'}},
    {bPonctuel: false, temps: Math.floor(Math.random() * 300 ) + 300, frequence: 1000, getAction: function(){return 'Suivre la direction du premier panneau'}, randomize: function(){this.temps = Math.floor(Math.random() * 300 ) + 300 }},
    {bPonctuel: true, temps: 0, frequence: 1, getAction: function(){return 'GPS McDo'}},
    {bPonctuel: true, temps: 0, frequence: 1, getAction: function(){return 'Rejoindre l\'autoroute'}},
    {bPonctuel: true, temps: 0, frequence: 1, getAction: function(){return 'Prochain feu vert tu cales si t\'es pas 1er sinon drag race'}},
    {bPonctuel: true, temps: 0, frequence: 1, getAction: function(){return 'Le conducteur sort pour vérifier si y\'a quelqu\'un au stop'}},
    {bPonctuel: true, temps: 0, frequence: 1, getAction: function(){return 'Le conducteur sort pour vérifier si y\'a quelqu\'un au stop'}},

];
let commun = [new SuivreVoiture(),
    {bPonctuel: false, temps: Math.floor(Math.random() * 300 ) + 300, frequence: 1, getAction: function(){return 'Le passager passe les vitesses'}, randomize: function(){this.temps = Math.floor(Math.random() * 300 ) + 300 }},
    {bPonctuel: false, temps: Math.floor(Math.random() * 180 ) + 120, frequence: 1, getAction: function(){return 'Roule doucement'}, randomize: function(){this.temps = Math.floor(Math.random() * 180 ) + 120 }},
]

function getRandomAction()
{
    let concat = [];
    if (boutonSwitch.innerText === 'Autoroute')
        concat = [...commun, ...autoroute];
    else
        concat = [...commun, ...ville];

    const result = [];

    concat.forEach((item) =>
    {
        for ( let i = 0; i < item.frequence; i++)
        {
            result.push(item);
        }
    });

    return result[Math.floor(Math.random() * result.length)];
}

function onAddActionClick()
{
    new Action(getRandomAction());
}


function onDeleteActionClick(event) {
    event.currentTarget.remove();
}

function onChangeModeClick(event)
{
    if (event.target.innerText === "Ville")
        event.target.innerText = "Autoroute";

    else if (event.target.innerText === "Autoroute")
        event.target.innerText = "Ville";
}

function onCreateNewActionClick() {

}


let boutonGen = document.getElementById("boutonGenerer")
boutonGen.onclick = onAddActionClick;

let boutonSwitch = document.getElementById("boutonSwitch")
boutonSwitch.onclick = onChangeModeClick;

let boutonIdee = document.getElementById("boutonAddIdee")
boutonIdee.onclick = onCreateNewActionClick;

