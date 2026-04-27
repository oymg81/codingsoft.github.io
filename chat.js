// Initialize EmailJS
emailjs.init("Lgwtc4N0HsuCnzZfh");

const SUPABASE_URL = "https://abfjdyqhbvhhebuekamx.supabase.co";
const SUPABASE_KEY = "sb_publishable_O5SF6k_EiIj7H7QyeHUQUw_yanU2B3M";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);




// chat.js
document.addEventListener('DOMContentLoaded', () => {
    if (window.chatInitialized) return;
    window.chatInitialized = true;

    // Inject HTML
    const widgetHTML = `
        <div class="chatbot-widget">
            <div class="proactive-greeting" id="proactive-greeting">
                <p>Hi! I'm Tetsuo 👋 Need help building a software system?</p>
                <button id="close-greeting" class="close-greeting">&times;</button>
            </div>
            <div class="chatbot-window" id="chatbot-window">
                <div class="chat-header">
                    <img src="avatar.png" alt="Tetsuo" class="chat-avatar" onerror="this.src='https://ui-avatars.com/api/?name=Tetsuo&background=0047FF&color=fff'">
                    <div class="chat-title">
                        <h4>Tetsuo</h4>
                        <p>● Online</p>
                    </div>
                </div>
                <div class="chat-body" id="chat-body">
                    <!-- Messages go here -->
                </div>
                <div class="chat-input-area">
                    <input type="text" id="chat-input" placeholder="Type a message..." disabled>
                    <button id="chat-send-btn" class="chat-send-btn" disabled>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </button>
                </div>
            </div>
            <button class="chatbot-launcher" id="chatbot-toggle">
                <img src="avatar.png" alt="Tetsuo" class="launcher-avatar" id="launcher-avatar" onerror="this.src='https://ui-avatars.com/api/?name=Tetsuo&background=0047FF&color=fff'">
                <div class="chatbot-online-dot" id="chatbot-online-dot"></div>
                <div class="launcher-close" id="chat-icon-close" style="display:none;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </div>
            </button>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', widgetHTML);

    // Elements
    const toggleBtn = document.getElementById('chatbot-toggle');
    const chatWindow = document.getElementById('chatbot-window');
    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send-btn');
    const iconClose = document.getElementById('chat-icon-close');
    const launcherAvatar = document.getElementById('launcher-avatar');
    const onlineDot = document.getElementById('chatbot-online-dot');
    const greetingBubble = document.getElementById('proactive-greeting');
    const closeGreetingBtn = document.getElementById('close-greeting');

    // State
    let isOpen = false;
    let step = 0;
    let isProcessing = false;
    const leadData = {
        serviceType: '',
        businessName: '',
        fullName: '',
        email: '',
        phone: '',
        message: '',
        createdAt: ''
    };

    const flow = [
        {
            type: 'options',
            text: "Hi! I'm Tetsuo from CodingSoft 👋 How can I help you today?",
            options: [
                "Website Development",
                "Business Automation",
                "Custom Web App",
                "AI-Powered Tools",
                "Systems Integration",
                "Other"
            ],
            key: 'serviceType'
        },
        { type: 'text', text: "What is your business name?", key: 'businessName' },
        { type: 'text', text: "What is your name?", key: 'fullName' },
        { type: 'email', text: "What is the best email to contact you?", key: 'email' },
        { type: 'text', text: "What is your phone number?", key: 'phone' },
        { type: 'text', text: "Briefly describe what you need.", key: 'message' },
        { type: 'summary', text: "Here is your summary. Does this look correct?" },
        { type: 'end', text: "Thank you! Your request has been received. Our team will contact you shortly." }
    ];

    // Proactive Greeting Logic
    function hideGreeting() {
        greetingBubble.classList.remove('show');
    }

    setTimeout(() => {
        if (!isOpen) {
            greetingBubble.classList.add('show');
        }
    }, 1500);

    closeGreetingBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        hideGreeting();
    });

    greetingBubble.querySelector('p').addEventListener('click', () => {
        hideGreeting();
        toggleBtn.click();
    });

    function resetChat() {
        chatBody.innerHTML = '';
        step = 0;
        isProcessing = false;
        chatInput.value = '';
        chatInput.disabled = true;
        sendBtn.disabled = true;
        Object.keys(leadData).forEach(key => leadData[key] = '');
    }

    // Toggle Chat
    toggleBtn.addEventListener('click', () => {
        isOpen = !isOpen;
        chatWindow.classList.toggle('open', isOpen);

        if (isOpen) {
            launcherAvatar.style.opacity = '0.2';
            iconClose.style.display = 'block';
            onlineDot.style.display = 'none';
            hideGreeting();
            if (step === 0 && chatBody.children.length === 0) {
                nextStep();
            }
        } else {
            launcherAvatar.style.opacity = '1';
            iconClose.style.display = 'none';
            onlineDot.style.display = 'block';
            setTimeout(resetChat, 300);
        }
    });

    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `chat-message ${sender}`;
        div.textContent = text;
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function addOptions(options) {
        const div = document.createElement('div');
        div.className = 'chat-options';
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'chat-option-btn';
            btn.textContent = opt;
            btn.addEventListener('click', () => handleUserInput(opt, true));
            div.appendChild(btn);
        });
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function addFinalButtons() {
        const div = document.createElement('div');
        div.className = 'chat-options final-options';

        const waBtn = document.createElement('button');
        waBtn.className = 'chat-option-btn';
        waBtn.style.background = '#25D366';
        waBtn.style.borderColor = '#25D366';
        waBtn.style.color = 'white';
        waBtn.style.textAlign = 'center';
        waBtn.style.fontWeight = 'bold';
        waBtn.textContent = 'Continue on WhatsApp';
        waBtn.addEventListener('click', generateWhatsAppLink);

        const closeBtn = document.createElement('button');
        closeBtn.className = 'chat-option-btn';
        closeBtn.style.textAlign = 'center';
        closeBtn.textContent = 'Close Chat';
        closeBtn.addEventListener('click', () => {
            isOpen = false;
            chatWindow.classList.remove('open');
            launcherAvatar.style.opacity = '1';
            iconClose.style.display = 'none';
            onlineDot.style.display = 'block';
            setTimeout(resetChat, 300);
        });

        div.appendChild(waBtn);
        div.appendChild(closeBtn);
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    async function nextStep() {
        if (step >= flow.length) return;

        const current = flow[step];
        addMessage(current.text, 'bot');

        if (current.type === 'options') {
            addOptions(current.options);
            chatInput.disabled = true;
            sendBtn.disabled = true;
        } else if (current.type === 'summary') {
            chatInput.disabled = true;
            sendBtn.disabled = true;
            
            const summaryHTML = `
                <div style="font-size: 0.85rem; line-height: 1.5;">
                <b>Service:</b> ${leadData.serviceType}<br>
                <b>Business:</b> ${leadData.businessName}<br>
                <b>Name:</b> ${leadData.fullName}<br>
                <b>Email:</b> ${leadData.email}<br>
                <b>Phone:</b> ${leadData.phone}<br>
                <b>Message:</b> ${leadData.message}
                </div>
            `;
            
            const div = document.createElement('div');
            div.className = 'chat-message bot';
            div.innerHTML = summaryHTML;
            chatBody.appendChild(div);
            
            addOptions(["Confirm & Submit", "Edit Details"]);
            chatBody.scrollTop = chatBody.scrollHeight;
        } else if (current.type === 'end') {
            chatInput.disabled = true;
            sendBtn.disabled = true;
            leadData.createdAt = new Date().toISOString();

            console.log("Submitting lead...");
            console.log(leadData);

            await submitLead(leadData);
            sendEmailNotification(leadData);
            addFinalButtons();
        } else {
            chatInput.disabled = false;
            sendBtn.disabled = false;
            chatInput.focus();
        }
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function handleUserInput(value, isOption = false) {
        if (!value || !value.trim() || isProcessing) return;

        const current = flow[step];

        if (isOption && current.type !== 'options' && current.type !== 'summary') {
            return; // Ignore quick option clicks if we are expecting text
        }

        isProcessing = true;

        if (current.type === 'summary') {
            const optionsDivs = chatBody.querySelectorAll('.chat-options:not(.final-options)');
            const activeOptions = optionsDivs[optionsDivs.length - 1];
            if (activeOptions) {
                activeOptions.querySelectorAll('.chat-option-btn').forEach(btn => {
                    if (btn.textContent === value) btn.classList.add('selected');
                    btn.disabled = true;
                });
            }

            if (value === "Edit Details") {
                step = 1; // Restart from Business Name
                setTimeout(() => {
                    nextStep();
                    isProcessing = false;
                }, 500);
                return;
            }
            value = "Confirm & Submit";
        }

        if (current.type === 'email' && !validateEmail(value)) {
            if (!isOption) addMessage(value, 'user');
            addMessage("Please enter a valid email address.", 'bot');
            chatInput.value = '';
            isProcessing = false;
            return;
        }

        if (!isOption) {
            addMessage(value, 'user');
        } else {
            // Mark option as selected and disable all in the active group
            const optionsDivs = chatBody.querySelectorAll('.chat-options:not(.final-options)');
            const activeOptions = optionsDivs[optionsDivs.length - 1];
            if (activeOptions) {
                activeOptions.querySelectorAll('.chat-option-btn').forEach(btn => {
                    if (btn.textContent === value) {
                        btn.classList.add('selected');
                    }
                    btn.disabled = true;
                });
            }
        }

        // Save data
        if (current.key) {
            leadData[current.key] = value;
        }

        chatInput.value = '';
        step++;
        setTimeout(() => {
            nextStep();
            isProcessing = false;
        }, 500);
    }

    sendBtn.addEventListener('click', () => handleUserInput(chatInput.value));
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserInput(chatInput.value);
    });

    async function submitLead(data) {
        console.log("Sending to Supabase...");
        console.log('Lead Data Collected:', data);
        localStorage.setItem('codingsoft_lead', JSON.stringify(data));

        try {
            const { data: result, error } = await supabaseClient
                .from('leads')
                .insert([
                    {
                        service_type: data.serviceType,
                        business_name: data.businessName,
                        full_name: data.fullName,
                        email: data.email,
                        phone: data.phone,
                        message: data.message
                    }
                ]);

            if (error) {
                console.error("Supabase error:", error);
                throw error;
            }
            console.log('Successfully submitted lead to Supabase:', result);
        } catch (error) {
            console.error('Error submitting lead to Supabase:', error.message);
        }
    }

    function sendEmailNotification(data) {
        console.log("Sending email...");
        const templateParams = {
            full_name: data.fullName,
            business_name: data.businessName,
            service_type: data.serviceType,
            email: data.email,
            phone: data.phone,
            message: data.message
        };

        emailjs.send(
            "service_5639krm",
            "template_s5x7mml",
            templateParams,
            "Lgwtc4N0HsuCnzZfh"
        )
            .then(() => console.log("✅ Email sent successfully"))
            .catch((error) => console.error("❌ Email error:", error));
    }


    function generateWhatsAppLink() {
        const text = `Hi CodingSoft! I would like to request a quote.\n\n*Service:* ${leadData.serviceType}\n*Business:* ${leadData.businessName}\n*Name:* ${leadData.fullName}\n*Email:* ${leadData.email}\n*Phone:* ${leadData.phone}\n*Message:* ${leadData.message}`;
        const encodedText = encodeURIComponent(text);
        window.open(`https://wa.me/message/BOB3EMBT3RKRO1?text=${encodedText}`, "_blank");
    }
});
