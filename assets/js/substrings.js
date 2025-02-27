
//import { WORDS } from "./dictonary.js";

const TWO_COMBOS = [
    'aa','ab','ac','ad','ae','af','ag','ah','ai','aj','ak','al','am','an','ao','ap','aq','ar','as','at','au','av','aw','ax','ay','az',
    'ba','bb','bc','bd','be','bf','bg','bh','bi','bj','bk','bl','bm','bn','bo','bp','br','bs','bt','bu','bv','bw','by','bz',
    'ca','cb','cc','cd','ce','ch','ci','ck','cl','cm','cn','co','cp','cq','cr','cs','ct','cu','cw','cy','cz',
    'da','db','dc','dd','de','df','dg','dh','di','dj','dk','dl','dm','dn','do','dp','dq','dr','ds','dt','du','dv','dw','dy','dz',
    'ea','eb','ec','ed','ee','ef','eg','eh','ei','ej','ek','el','em','en','eo','ep','eq','er','es','et','eu','ev','ew','ex','ey','ez',
    'fa','fb','fc','fd','fe','ff','fg','fh','fi','fj','fk','fl','fm','fn','fo','fp','fr','fs','ft','fu','fw','fy',
    'ga','gb','gc','gd','ge','gf','gg','gh','gi','gj','gk','gl','gm','gn','go','gp','gr','gs','gt','gu','gv','gw','gy','gz',
    'ha','hb','hc','hd','he','hf','hg','hh','hi','hj','hk','hl','hm','hn','ho','hp','hq','hr','hs','ht','hu','hv','hw','hy','hz',
    'ia','ib','ic','id','ie','if','ig','ih','ii','ij','ik','il','im','in','io','ip','iq','ir','is','it','iu','iv','iw','ix','iy','iz',
    'ja','jd','je','ji','jj','jk','jn','jo','jr','js','ju',
    'ka','kb','kc','kd','ke','kf','kg','kh','ki','kj','kk','kl','km','kn','ko','kp','kr','ks','kt','ku','kv','kw','ky',
    'la','lb','lc','ld','le','lf','lg','lh','li','lj','lk','ll','lm','ln','lo','lp','lq','lr','ls','lt','lu','lv','lw','lx','ly','lz',
    'ma','mb','mc','md','me','mf','mg','mh','mi','mj','mk','ml','mm','mn','mo','mp','mq','mr','ms','mt','mu','mv','mw','my','mz',
    'na','nb','nc','nd','ne','nf','ng','nh','ni','nj','nk','nl','nm','nn','no','np','nq','nr','ns','nt','nu','nv','nw','nx','ny','nz',
    'oa','ob','oc','od','oe','of','og','oh','oi','oj','ok','ol','om','on','oo','op','oq','or','os','ot','ou','ov','ow','ox','oy','oz',
    'pa','pb','pc','pd','pe','pf','pg','ph','pi','pj','pk','pl','pm','pn','po','pp','pr','ps','pt','pu','pw','py',
    'qa','qe','qi','qo','qs','qu','qw',
    'ra','rb','rc','rd','re','rf','rg','rh','ri','rj','rk','rl','rm','rn','ro','rp','rq','rr','rs','rt','ru','rv','rw','ry','rz',
    'sa','sb','sc','sd','se','sf','sg','sh','si','sj','sk','sl','sm','sn','so','sp','sq','sr','ss','st','su','sv','sw','sy','sz',
    'ta','tb','tc','td','te','tf','tg','th','ti','tj','tk','tl','tm','tn','to','tp','tq','tr','ts','tt','tu','tv','tw','ty','tz',
    'ua','ub','uc','ud','ue','uf','ug','uh','ui','uj','uk','ul','um','un','uo','up','uq','ur','us','ut','uu','uv','uw','ux','uy','uz',
    'va','vd','ve','vg','vi','vk','vl','vn','vo','vr','vs','vu','vv','vy','vz',
    'wa','wb','wc','wd','we','wf','wg','wh','wi','wj','wk','wl','wm','wn','wo','wp','wr','ws','wt','wu','ww','wy','wz',
    'xa','xb','xc','xd','xe','xf','xg','xh','xi','xl','xm','xn','xo','xp','xq','xs','xt','xu','xv','xw','xy',
    'ya','yb','yc','yd','ye','yf','yg','yh','yi','yj','yk','yl','ym','yn','yo','yp','yr','ys','yt','yu','yv','yw','yx','yy','yz',
    'za','zb','zc','zd','ze','zg','zh','zi','zj','zk','zl','zm','zn','zo','zp','zq','zs','zt','zu','zv','zw','zy','zz',
]

let TWO_LETTER_COMBOS = TWO_COMBOS.length
const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let twocombo = TWO_COMBOS[Math.floor(Math.random() * TWO_COMBOS.length)]
//let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]
console.log(twocombo)

function initBoard() {
    let board = document.getElementById("game-board");
    const boxesPerRow = 10;

    for (let i = 0; i < TWO_COMBOS.length; i++) {
        if (i % boxesPerRow === 0) {
            var row = document.createElement("div");
            row.className = "letter-row";
            board.appendChild(row);
        }

        let box = document.createElement("div");
        box.className = "letter-box";
        box.textContent = TWO_COMBOS[i];
        row.appendChild(box);
    }

}

initBoard()

/*

document.addEventListener("keyup", (e) => {                 

    if (guessesRemaining === 0) {return}                    // If you're out of guesses, do nothing

    let pressedKey = String(e.key)                          // Defines 'pressedKey' variable to be the key pressed
    if (pressedKey === "Backspace" && nextLetter !== 0) {   // If the key you pressed was Delete AND there exists a letter to be deleted
        deleteLetter()                                      // Run the function that deletes that letter
        return
    }

    if (pressedKey === "Enter") {                           // If you pressed the Return key, run the function that checks your guess
        checkGuess()                                        
        return
    }

    let found = pressedKey.match(/[a-z]/gi)                 // If you pressed a letter key
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})




function insertLetter (pressedKey) {
    if (nextLetter === 5) {
        return
    }
    pressedKey = pressedKey.toLowerCase()

    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter]
    box.textContent = pressedKey
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    nextLetter += 1
}

function deleteLetter () {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.pop()
    nextLetter -= 1
}

function checkGuess () {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let guessString = ''
    let rightGuess = Array.from(rightGuessString)

    for (const val of currentGuess) {
        guessString += val
    }

    if (guessString.length != 5) {
        toastr.error("Not enough letters!")
        return
    }

    if (!WORDS.includes(guessString)) {
        toastr.error("Word not in list!")
        return
    }


    for (let i = 0; i < 5; i++) {
        let letterColor = ''
        let box = row.children[i]
        let letter = currentGuess[i]

        let letterPosition = rightGuess.indexOf(currentGuess[i])
        // is letter in the correct guess
        if (letterPosition === -1) {
            letterColor = 'grey'
        } else {
            // now, letter is definitely in word
            // if letter index and right guess index are the same
            // letter is in the right position 
            if (currentGuess[i] === rightGuess[i]) {
                // shade green 
                letterColor = 'green'
            } else {
                // shade box yellow
                letterColor = 'yellow'
            }

            rightGuess[letterPosition] = "#"
        }

        let delay = 250 * i
        setTimeout(()=> {
            //shade box
            box.style.backgroundColor = letterColor
            shadeKeyBoard(letter, letterColor)
        }, delay)
    }

    if (guessString === rightGuessString) {
        toastr.success("You guessed right! Game over!")
        guessesRemaining = 0
        return
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            toastr.error("You've run out of guesses! Game over!")
            toastr.info(`The right word was: "${rightGuessString}"`)
        }
    }
}

function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor
            if (oldColor === 'green') {
                return
            } 

            if (oldColor === 'yellow' && color !== 'green') {
                return
            }

            elem.style.backgroundColor = color
            break
        }
    }
}

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target

    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent

    if (key === "Del") {
        key = "Backspace"
    } 

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})

*/

function checkWord() {
    let inputField = document.querySelector(".fixed-input");
    let word = inputField.value.toLowerCase();
    let boxes = document.querySelectorAll(".letter-box");
    
    boxes.forEach(box => {
        if (!box.classList.contains("locked")) {
            let combo = box.textContent.toLowerCase();
            if (word.includes(combo)) {
                box.textContent = word;
                box.classList.add("locked");
                box.style.backgroundColor = "#4FA83D";
                box.style.fontSize = "12px";
                box.style.textTransform = "lowercase";
            }
        }
    });
    inputField.value = ""; // Clear the input field

}

document.querySelector(".fixed-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkWord();
    }
});
