import { storageService } from '../../../services/storage.service.js';
import { utilService } from '../../../services/util.service.js';
const DB_KEY = 'mailDb';
const TYPES = ['inbox', 'sent', 'stared', 'trash', 'draft', 'all'];
const LABELS = [
    { value: 'Important', color: '#f89f94' },
    { value: 'Social', color: '#ffc7a2' },
    { value: 'Friends', color: '#c4e6d5' },
    { value: 'Family', color: '#bfcdde' }
];
const USER = {
    name: 'Shahar Meshulam',
    mail: 'shahar.mesh@gmail.com'
}
let gMails = storageService.loadFromStorage(DB_KEY) || [];

export const mailService = {
    getMailsToDisplay,
    addMail,
    getTypes,
    getMailById,
    getUser,
    remove,
    toggleStared,
    setMailIsRead,
    getLabels,
    getMailLabels,
    addLabel,
};

init();

function init() {
    gMails = storageService.loadFromStorage(DB_KEY);
    if (!gMails) _createMails();
}

function getMailsToDisplay(criteria) {
    console.log('criteria:', criteria)
    const status = criteria.status || null;
    const isStared = criteria.isStared || null
    const txt = criteria.txt || null;
    const isRead = (!criteria.isRead) ? null : criteria.isRead === 'true' ? true : false;
    const labels = criteria.labels || [];
    return Promise.resolve(gMails.filter(mail =>
        _filterByStatus(mail, status) &&
        _filterByIsStared(mail, isStared) &&
        _filterByTxt(mail, txt) &&
        _fliterByIsRead(mail, isRead) &&
        _filterByLabels(mail, labels)
    ));
}

function getTypes() {
    return TYPES;
}

function getUser() {
    return USER;
}

function getLabels() {
    return Promise.resolve(LABELS);
}

function getMailLabels(mailId) {
    return getMailById(mailId)
        .then(mail => mail.labels);
}

function addLabel(mailId, label) {
    return getMailById(mailId)
        .then(mail => {
            if (mail.labels.find(lbl => lbl.color === label.color)) return;
            mail.labels.push(label);
            storageService.saveToStorage(DB_KEY, gMails);
        })
}

function addMail(mail, id = utilService.makeId(), sentAt = Date.now()) { // TODO CHECK!
    return new Promise((resolve, reject) => {
        getMailById(mail.id)
            .then(m => {
                if (m) {
                    m = mail;
                    m.sentAt = sentAt;
                    const idx = gMails.findIndex(ml => ml.id === mail.id);
                    gMails[idx] = m;
                    storageService.saveToStorage(DB_KEY, gMails);
                    resolve();
                } else {
                    mail.id = id;
                    mail.sentAt = sentAt;
                    gMails.push(mail);
                    storageService.saveToStorage(DB_KEY, gMails);
                    resolve();
                }
            });
    })
}

function getMailById(id) {
    return Promise.resolve(gMails.find(mail => mail.id === id));
}

function remove(mailId) {
    return getMailById(mailId)
        .then(mail => {
            if (mail.status === 'trash') gMails.splice(gMails.findIndex(m => m.id === mailId), 1);
            else mail.status = 'trash';
            storageService.saveToStorage(DB_KEY, gMails);
        })
}

function toggleStared(mailId) {
    return this.getMailById(mailId)
        .then(mail => {
            mail.isStared = !mail.isStared;
            storageService.saveToStorage(DB_KEY, gMails);
            return mail;
        });
}

function setMailIsRead(mailId, isRead) {
    return this.getMailById(mailId)
        .then(mail => {
            mail.isRead = isRead;
            storageService.saveToStorage(DB_KEY, gMails);
            return mail;
        });
}

function _filterByStatus(mail, status) {
    if (!status || status === 'all') return true;
    return mail.status === status;
}

function _filterByIsStared(mail, isStared) {
    if (!isStared) return true;
    return mail.isStared === isStared;
}

function _filterByTxt(mail, txt) {
    if (!txt) return true;
    if (mail.subject.includes(txt)) return true;
    if (mail.body.includes(txt)) return true;
    if (mail.to.includes(txt)) return true;
    if (mail.from.includes(txt)) return true;
    return false;
}

function _fliterByIsRead(mail, isRead) {
    if (isRead === null) return true;
    if (isRead === mail.isRead) return true;
    return false;
}

function _filterByLabels(mail, labels) {
    if (!labels.length) return true;
    if (mail.labels.some(label => labels.includes(label.color))) return true;
    return false;
}

function _createMails() {
    //INBOX
    gMails = [];
    let mail = {
        to: USER.mail,
        subject: 'oripilpel invited you to oripilpel/AppSUS‏‏',
        body: `@oripilpel has invited you to collaborate on the
        oripilpel/AppSUS repository
        You can accept or decline this invitation. You can also head over to https://github.com/oripilpel/AppSUS to check out the repository or visit @oripilpel to learn a bit more about them.
        
        This invitation will expire in 7 days.
        
        View invitation
        Note: This invitation was intended for shahar.mesh@gmail.com. If you were not expecting this invitation, you can ignore this email. If @oripilpel is sending you too many emails, you can block them or report abuse.`,
        from: 'noreply@github.com‏',
        isRead: false,
        isStared: false,
        status: 'inbox',
        labels: []
    };
    addMail(mail);
    mail = {
        to: USER.mail,
        subject: 'שחר, בהמשך לביקורך באפליקציית לאומי...‏‏',
        body: `@אם אינך רואה מייל זה יש ללחוץ כאן
 
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
        from: 'info@digital.leumi.co.il‏‏',
        isRead: false,
        isStared: false,
        status: 'inbox',
        labels: []
    };
    addMail(mail);
    mail = {
        to: USER.mail,
        subject: 'The Overflow #88: Building a better developer platform‏‏‏‏',
        body: `AUGUST
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
        from: 'do-not-reply@stackoverflow.email‏‏',
        isRead: false,
        isStared: false,
        status: 'inbox',
        labels: []
    };
    addMail(mail);
    mail = {
        to: USER.mail,
        subject: 'Smart Plug WiFi Socket 16A Power Monitor Timing Function SmartLife APP ControlHover to zoom‏‏‏‏',
        body: `thumbnail 1 - Smart Plug WiFi Socket 16A Power Monitor Timing Function SmartLife APP Control
        
        thumbnail 2 - Smart Plug WiFi Socket 16A Power Monitor Timing Function SmartLife APP Control
        
        thumbnail 3 - Smart Plug WiFi Socket 16A Power Monitor Timing Function SmartLife APP Control
        
        thumbnail 4 - Smart Plug WiFi Socket 16A Power Monitor Timing Function SmartLife APP Control
        
        thumbnail 5 - Smart Plug WiFi Socket 16A Power Monitor Timing Function SmartLife APP Control
        
        thumbnail 6 - Smart Plug WiFi Socket 16A Power Monitor Timing Function SmartLife APP Control
        
        thumbnail 7 - Smart Plug WiFi Socket 16A Power Monitor Timing Function SmartLife APP Control
        
        Shop with confidence
        eBay Money Back Guarantee
        Get the item you ordered or get your money back. Learn more- eBay Money Back Guarantee - opens in new window or tab
        Seller information
        happyshopping0 (69 )
        94.6% Positive feedback
         Save this Seller
        Contact seller
        See other items
        
        Smart Plug WiFi Socket 16A Power Monitor Timing Function SmartLife APP Control
        Popular Item 15 viewed per day
        Condition:New
        Type:
        1pcs EU 16A plug
        Quantity:
        1
        6 available / 2 sold
        Price:
        US $17.99
        Approximately ILS 57.99
        Add to cart
         Add to Watchlist
        Free
        Shipping
        30-day
        Returns
        Longtime
        Member
        Shipping:
        FREE Economy International Shipping | See details
        International shipment of items may be subject to customs processing and additional charges.  
         
        Located in:
        HK, Hong Kong
         
        Ships to:
        Worldwide
        Delivery:
        Estimated between Mon. Sep. 20 and Thu. Nov. 11
        Seller ships within 5 days after receiving cleared payment- opens in a new window or tab.  
        Payments:
        PayPal Google Pay Visa Master Card Amex Discover
        Returns:
        30 day returns. Buyer pays for return shipping |  See details
        `,
        from: 'ebay@reply5.ebay.com‏',
        isRead: false,
        isStared: false,
        status: 'inbox',
        labels: []
    };
    addMail(mail, utilService.makeId(), '2021-08-25T10:53:38+00:00');
    mail = {
        to: USER.mail,
        subject: 'Updates to Reddit’s User Agreement and Privacy Policy‏‏‏‏',
        body: `We're writing to let you know that we've updated Reddit's User Agreement, Privacy Policy, and Premium and Virtual Goods Agreement. These updated terms will take effect on September 12, 2021, and they will apply to you if you use Reddit after September 12.

We encourage you to review the updated terms in full. Here are some of the highlights:

We made small updates throughout our terms to make them clearer and more specific.

We updated some information based on where you use our services. Now there is a separate User Agreement for users located in the European Economic Area, United Kingdom, or Switzerland.

We added terms to our Reddit Premium and Virtual Goods Agreement related to services obtained through third parties, cancellation, and for users in the EEA, UK, or Switzerland, withdrawal.

We removed reference to Programmatic Advertising in our Privacy Policy as we no longer support it on our site.

We clarified the transfer mechanism we rely upon for the transfer of personal data of EEA, UK, and Switzerland users.


If you have questions, please visit Reddit Help.

- Reddit
	
You are receiving this email because a Reddit account, shahar-mesh, is registered to this email address.
548 Market St., #16093, San Francisco, CA 94104–5401`,
        from: 'noreply@redditmail.com‏',
        isRead: false,
        isStared: false,
        status: 'inbox',
        labels: []
    };
    addMail(mail, utilService.makeId(), '2021-08-24T04:53:38+00:00');
    mail = {
        to: USER.mail,
        subject: 'Which altcoins can actually 1000x in the next 10 years?',
        body: `Shahar's Digest
        TOP STORIES FOR YOU
        Which altcoins can actually 1000x in the next 10 years?
        L. Sebastian Purcell, PhD		
        L. Sebastian Purcell, PhD, Experienced Algorithmic Investor • Answered August 10
        
        This one is a little more realistic than most moonshot requests. 1000x returns, which would take you from $1000 to $1,000,000, over 10 years are doable. The biggest problem... Read More »
        Why do software companies still use Java, when better programming languages like C# and .NET are available with great tooling support?
        Alfredo Pinto		
        Alfredo Pinto, works at Softtek • Answered March 16, 2018
        
        As a senior developer (18+ years) I will give you this advice: Avoid to all cost trying to find the best of everything like a religion seeking for the truth. There are no si... Read More »
        
        Too many students are joining Computer Science field. Is it likely that we will soon see way more CS graduates than the number actually required?
        Bruce F. Webster		
        Bruce F. Webster, Professor, Software Engineering at Brigham Young University (2017-present) • Answered June 9
        
        This is a cycle that happens roughly every 15-20 years, usually because people become convinced that a CS degree (or, nowadays, bootcamps and YouTube videos) are the easy r... Read More »
        I lost 9.5 bitcoin to a scam. Is it possible to recover it?
        Helen Rio Grande		
        Helen Rio Grande, Associate Consultant | Data & Analytics at Slalom • Answered June 7
        
        Cryptocurrency scams have soared in recent months, new figures reveal, as victims report losing millions every week to criminals seeking to capitalize on the bitcoin craze. ... Read More »
        Is Node.js the future of back-end technologies?
        Dave Voorhis		
        Dave Voorhis, Software entrepreneur, engineer, and educator for 35+ years. • Answered May 6
        
        The future, as in the only choice of back-end technology? Heavens, no. Listen — Node.js is perfectly fine for what it does and what it’s for. It’s a reasonable tool for certa... Read More »
        Read More in Your Feed
        Never miss a story. Designed for readers on the go.
        Download on the App StoreGet it on Google Play
        This email was sent by Quora (605 Castro Street, Mountain View, CA 94041).
        If you don't want to receive this type of email in the future, please unsubscribe.
        https://www.quora.com`,
        from: 'english-digest-noreply@quora.com‏‏',
        isRead: false,
        isStared: false,
        status: 'inbox',
        labels: []
    };
    addMail(mail, utilService.makeId(), '2021-08-24T04:53:38+00:00');
    mail = {
        to: USER.mail,
        subject: 'I changed my mind‏‏',
        body: `Shahar,

        All week, we've been talking about Rachel Miller and her "Viral Funneling Formula."
        
        This is the exact formula that she's recently used to create 29 viral posts that each have resulted in more than a MILLION page views... and she's sharing it with all of us!
        
        This method will quickly:
        
        Flood your funnels with fans & followers... for free
        Create an experience that people LOVE to engage with on your channels
        Reach millions of die-hard fans who are eager to promote your content and grow your brand's reach quickly and reliably... whenever you want!
        Turns social media strangers into raving customers without breaking the bank
        Inject freedom, excitement, and FUN into your day so you fall in love with your business all over again
        Make you a trusted authority in your niche
        
        ...all without using your wallet or needing a big following.
        
        When I first heard about it I didn't believe her but after she showed me her secret, I changed my mind.
        
        This is a must-see for anyone struggling to be seen on social media or lacking enough quality traffic for their offers.
        
        To be a part of this workshop, all you need to do is go here and register.
        
        But do it before it closes down soon!
        
        - Ryan
        
        P.S. You'll also get a whole bunch of bonuses plus a massive discount (83% to be exact) when you save your seat before this timer hits zero.
        
        Ryan Deiss
        Co-Founder & CEO
        DigitalMarketer
         
        Sent to: shahar.mesh@gmail.com
        DigitalMarketer, 4330 Gaines Ranch Loop, 120, Austin, TX 78735, United States
        
        Know someone who’d like this email? Forward it to a friend!
        Did someone forward this email to you? Become a subscriber!
        Don't want future emails? Unsubscribe`,
        from: 'members@digitalmarketer.com‏‏',
        isRead: false,
        isStared: false,
        status: 'inbox',
        labels: []
    };
    addMail(mail, utilService.makeId(), '2021-08-23T15:53:38+00:00');
    // SENT
    mail = {
        to: 'studio.diana.p@gmail.com‬',
        subject: 'marerials‏‏‏‏',
        body: `AUGUST
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
        from: USER.mail,
        isRead: true,
        isStared: false,
        status: 'sent',
        labels: []
    };
    addMail(mail);
    mail = {
        to: '‫oahdout85@gmail.com‬‬',
        subject: 'contract',
        body: `Does this sound familiar?

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
        from: USER.mail,
        isRead: true,
        isStared: false,
        status: 'sent',
        labels: []
    };
    addMail(mail);
    mail = {
        to: 'r‫evital@opster.com‬',
        subject: 'about our discution',
        body: `Shahar,

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
        from: USER.mail,
        isRead: true,
        isStared: false,
        status: 'sent',
        labels: []
    };
    addMail(mail)

    // storageService.saveToStorage(DB_KEY, gMails);
}

