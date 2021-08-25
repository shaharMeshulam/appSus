import { storageService } from '../../../services/storage.service.js';
import { utilService } from '../../../services/util.service.js';
const DB_KEY = 'mailDb';
const TYPES = ['inbox', 'sent', 'stared', 'trash', 'draft'];
const USER = {
    name: 'Shahar Meshulam',
    mail: 'shahar.mesh@gmail.com'
}
let gMails = storageService.loadFromStorage(DB_KEY) || [];

export const mailService = {
    getMailsToDisplay,
    addMail,
    getTypes
};

init();

function init() {
    gMails = storageService.loadFromStorage(DB_KEY);
    if (!gMails) _createMails();
}

function getMailsToDisplay(type) {
    switch (type) {
        case 'inbox':
            return Promise.resolve(gMails.filter(mail => mail.to === USER.mail && !mail.isInTrash));
        case 'sent':
            return Promise.resolve(gMails.filter(mail => mail.from === USER.mail && !mail.isInTrash));
        case 'stared':
            return Promise.resolve(gMails.filter(mail => mail.isStared));
        case 'trash':
            return Promise.resolve(gMails.filter(mail => mail.isInTrash));
    }
}

function getTypes() {
    return TYPES;
}

function addMail(mail, timeStamp = Date.now(), isDraft = false, isStared = false, isInTrash = false) {
    mail.id = utilService.makeId();
    mail.timeStamp = timeStamp;
    mail.isDraft = isDraft;
    mail.isStared = isStared,
    mail.isInTrash = isInTrash;
    gMails.push(mail);
}

function _createMails() {
    //INBOX
    gMails = [];
    let mail = {
        to: USER.mail,
        subject: 'oripilpel invited you to oripilpel/AppSUS‏‏',
        txt: `@oripilpel has invited you to collaborate on the
        oripilpel/AppSUS repository
        You can accept or decline this invitation. You can also head over to https://github.com/oripilpel/AppSUS to check out the repository or visit @oripilpel to learn a bit more about them.
        
        This invitation will expire in 7 days.
        
        View invitation
        Note: This invitation was intended for shahar.mesh@gmail.com. If you were not expecting this invitation, you can ignore this email. If @oripilpel is sending you too many emails, you can block them or report abuse.`,
        status: 'unRead',
        from: 'noreply@github.com‏'
    };
    addMail(mail);
    mail = {
        to: USER.mail,
        subject: 'שחר, בהמשך לביקורך באפליקציית לאומי...‏‏',
        txt: `@אם אינך רואה מייל זה יש ללחוץ כאן
 
        leumi digital	
        
        היי שחר,
        לאחרונה השתמשת באפליקציה שלנו וממש חשוב לנו לשמוע מה דעתך עליה.
         
        מכאן מתחילים >>	
         
        אפליקציית לאומי
        שירותים מתקדמים שחוסכים לכם זמן
        Download on the AppStore		ANDROID APP ON | Google play
         
        Facebook
        Twitter
        Instagram
        YouTube
        Blog
        Website
        
        בכפוף להיבטים המשפטיים באתר ובאפליקציית לאומי.
        
        לקבלת סיוע במענה על הסקר לאנשים עם מוגבלות פנו אלינו בכתובת: Negishut.leumi@bankleumi.co.il
         
        בנק לאומי, יהודה הלוי 35 תל אביב, מיקוד 6513657 | יצירת קשר: מרכז בנקאות (לאומי callי) 5522*`,
        status: 'unRead',
        from: 'info@digital.leumi.co.il‏‏'
    };
    addMail(mail);
    mail = {
        to: USER.mail,
        subject: 'The Overflow #88: Building a better developer platform‏‏‏‏',
        txt: `AUGUST
        Welcome to ISSUE #88 of The Overflow! This newsletter is by developers, for developers, written and curated by the Stack Overflow team and Cassidy Williams at Netlify. This week: we discuss the close of the Prosus deal with our CEO, figure out how to change matrix values in R, and add machine learning to our humble Jamstack sites.
            
        From the blog
        Using stretch work assignments to help engineers grow stackoverflow.blog
        Stretch work assignments are tasks or projects that are a bit beyond an engineer’s current skill or knowledge level and that allow them to improve and learn new things. When done correctly these assignments serve a dual purpose of providing learning opportunities for your engineers, while at the same time completing a project or task that will help your company.
        
        Celebrating the Stack Exchange sites that turned 10 years old stackoverflow.blog
        We’re more than just StackOverflow.com; here’s a few of the sites in the Stack Exchange network that have been around for a decade!
        
        Podcast 367: Building a better developer platform stackoverflow.blog
        For the last time: No, we’re not putting a paywall on the community.
        
        HealthCare Locator: An open-source SDK for Healthcare apps promotion
        Creating health apps just got easier. Tap into the world’s leading HealthCare provider database, add HCP names, locations & specialty information with pre-built search & map display screens and admin tools for layout customization.
            
        Interesting questions
        Found a good question or answer? Tweet us with the hashtag #StackOverflowKnows or email us at stackoverflowknows@stackoverflow.com. We’ll include our favorites in the future.
        
        How to change matrix entries using conditional if in R? stackoverflow.com
        This isn’t a yes or no question; it’s a whole matrix of them.
        
        What happens if two local systems download the same resource on same port? serverfault.com
        They fight and one of them gets stronger, right?
        
        What are pros/cons of using buttons instead of plain links to download a document? ux.stackexchange.com
        The extra shiny factor of buttons makes it more tempting to click.
        
        I am spending more time installing software than coding. Why? softwareengineering.stackexchange.com
        As a developer, don’t assume that the work that you’re not interested in should be no effort.
        
            
        Links from around the web
        Building a switch component web.dev
        Switches may be simple to look at, but they are mighty to try out. Here’s how to make a responsive and accessible one!
        
        Strategies for dealing with horizontal overflows polypane.app
        We’ve all run into those horrid, unplanned horizontal scrollbars in various websites around the world. Here’s a great set of strategies for dealing with them once and for all!
        
        Adding machine learning to your Jamstack site www.netlify.com
        Machine learning? On the web? Heck yeah. This is an awesome dive into the options you have when building ML-driven web apps and integrating them with serverless functions.
        
        Introducing MIDIVal: the easiest way to interact with MIDI in your browser kulak.medium.com
        MIDI has been around for ages, and now there’s even more ways to interact with it in your browser!
        
        Onboard, organize, and bring your team up to speed in a jiffy. Try Stack Overflow for Teams.
        
        
        You’re receiving this email because you are subscribed to The Overflow Newsletter from Stack Overflow.
        Unsubscribe from emails like this     Edit email settings     Contact us     Privacy`,
        status: 'unRead',
        from: 'do-not-reply@stackoverflow.email‏‏'
    };
    addMail(mail);
    // SENT
    mail = {
        to: 'studio.diana.p@gmail.com‬',
        subject: 'marerials‏‏‏‏',
        txt: `AUGUST
        Welcome to ISSUE #88 of The Overflow! This newsletter is by developers, for developers, written and curated by the Stack Overflow team and Cassidy Williams at Netlify. This week: we discuss the close of the Prosus deal with our CEO, figure out how to change matrix values in R, and add machine learning to our humble Jamstack sites.
            
        From the blog
        Using stretch work assignments to help engineers grow stackoverflow.blog
        Stretch work assignments are tasks or projects that are a bit beyond an engineer’s current skill or knowledge level and that allow them to improve and learn new things. When done correctly these assignments serve a dual purpose of providing learning opportunities for your engineers, while at the same time completing a project or task that will help your company.
        
        Celebrating the Stack Exchange sites that turned 10 years old stackoverflow.blog
        We’re more than just StackOverflow.com; here’s a few of the sites in the Stack Exchange network that have been around for a decade!
        
        Podcast 367: Building a better developer platform stackoverflow.blog
        For the last time: No, we’re not putting a paywall on the community.
        
        HealthCare Locator: An open-source SDK for Healthcare apps promotion
        Creating health apps just got easier. Tap into the world’s leading HealthCare provider database, add HCP names, locations & specialty information with pre-built search & map display screens and admin tools for layout customization.
            
        Interesting questions
        Found a good question or answer? Tweet us with the hashtag #StackOverflowKnows or email us at stackoverflowknows@stackoverflow.com. We’ll include our favorites in the future.
        
        How to change matrix entries using conditional if in R? stackoverflow.com
        This isn’t a yes or no question; it’s a whole matrix of them.
        
        What happens if two local systems download the same resource on same port? serverfault.com
        They fight and one of them gets stronger, right?
        
        What are pros/cons of using buttons instead of plain links to download a document? ux.stackexchange.com
        The extra shiny factor of buttons makes it more tempting to click.
        
        I am spending more time installing software than coding. Why? softwareengineering.stackexchange.com
        As a developer, don’t assume that the work that you’re not interested in should be no effort.
        
            
        Links from around the web
        Building a switch component web.dev
        Switches may be simple to look at, but they are mighty to try out. Here’s how to make a responsive and accessible one!
        
        Strategies for dealing with horizontal overflows polypane.app
        We’ve all run into those horrid, unplanned horizontal scrollbars in various websites around the world. Here’s a great set of strategies for dealing with them once and for all!
        
        Adding machine learning to your Jamstack site www.netlify.com
        Machine learning? On the web? Heck yeah. This is an awesome dive into the options you have when building ML-driven web apps and integrating them with serverless functions.
        
        Introducing MIDIVal: the easiest way to interact with MIDI in your browser kulak.medium.com
        MIDI has been around for ages, and now there’s even more ways to interact with it in your browser!
        
        Onboard, organize, and bring your team up to speed in a jiffy. Try Stack Overflow for Teams.
        
        
        You’re receiving this email because you are subscribed to The Overflow Newsletter from Stack Overflow.
        Unsubscribe from emails like this     Edit email settings     Contact us     Privacy`,
        status: 'unRead',
        from: USER.mail
    };
    addMail(mail);
    mail = {
        to: '‫oahdout85@gmail.com‬‬',
        subject: 'contract',
        txt: `Does this sound familiar?

        You work really hard on a killer piece of content or curate something you know your audience is going to love.
        
        You get super excited... you load it up... hit "Post"... annnnnnnnd...
        
        
        Crickets.
        
        It keeps happening so you try things like...
        
        
        Asking questions
        Using hashtags
        Posting at certain times of the day
        Posting multiple times a day
        Tagging people
        And every other little hack you hear about
        
        ...but nothing seems to work.
        
        It's super frustrating, an enormous timesuck, and still, no one knows your company exists.
        
        Well, it's not your fault.
        
        It's because right now platforms, like Facebook, are overrun with content.
        
        So what do you do... how do you get a consistent and reliable strategy that turns social media strangers into raving fans and followers without breaking the bank?
        
        The answer?
        
        We found it in this little-known, yet super simple social strategy that seems to have cracked the code to the social media maze.
        
        It was uncovered by a friend and social media expert. She found that...
        
        "Sometimes the best way to win the game is to simply know the rules." —Rachel Miller
        
        And we've been watching as those "rules" consistently pump out posts that are getting MILLIONS of pageviews... without using influencers, paid promotions, or a big following.
        
        Here's her strategy so you can implement it too!
        
        Talk soon,
        Ryan
        
        Ryan Deiss
        Co-Founder & CEO
        DigitalMarketer
        
         
        
         
         
        Sent to: shahar.mesh@gmail.com
        DigitalMarketer, 4330 Gaines Ranch Loop, 120, Austin, TX 78735, United States
        
        Know someone who’d like this email? Forward it to a friend!
        Did someone forward this email to you? Become a subscriber!
        Don't want future emails? Unsubscribe`,
        status: 'unRead',
        from: USER.mail
    };
    addMail(mail);
    mail = {
        to: 'r‫evital@opster.com‬',
        subject: 'about our discution',
        txt: `Shahar,

        What is the only social media strategy that consistently drives fans & followers to your funnels FAST and reach millions for FREE...
        
        ...that does not require:
        
        Spending money on ads
        Creating constant content
        Having a big following
        Complex tracking & targeting
        Tons of time & effort
        
        HINT: it's not influencer marketing, giveaways, or cross promotions.
        
        Find out here.
        
        - Ryan
        
        P.S. This approach has proven to have people begging for your links and works on ALL the major platforms—Facebook, Instagram, Pinterest, YouTube and, yes, even TikTok.
        
        Check out these recent results!
        
        Ryan Deiss
        Co-Founder & CEO
        DigitalMarketer
        
        Sent to: shahar.mesh@gmail.com
        DigitalMarketer, 4330 Gaines Ranch Loop, 120, Austin, TX 78735, United States
        
        Know someone who’d like this email? Forward it to a friend!
        Did someone forward this email to you? Become a subscriber!
        Don't want future emails? Unsubscribe`,
        status: 'unRead',
        from: USER.mail
    };
    
    storageService.saveToStorage(DB_KEY, gMails);
}

