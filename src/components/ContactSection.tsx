import { useState } from 'react'
import { toast } from 'react-hot-toast';
import { RxCross2 } from 'react-icons/rx';
import { BrevoClient } from '@getbrevo/brevo';
import { MdEmail } from 'react-icons/md';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const showContactError = (message: string) => {
    toast.custom((t) => (
        <div
            role="alert"
            className={`contact-toast ${t.visible ? 'contact-toast--visible' : 'contact-toast--hidden'}`}
        >
            <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                <RxCross2 />
            </span>
            <span className="flex-1">{message}</span>
            <button
                type="button"
                aria-label="Dismiss notification"
                onClick={() => toast.dismiss(t.id)}
                className="font-medium text-zinc-500 hover:text-zinc-900 cursor-pointer"
            >
                <RxCross2 />
            </button>
        </div>
    ), { duration: 4000 });
};

const ContactSection = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [subject, setSubject] = useState("");
    const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY;

    const handleInputChange = (type: string, value: string,) => {

        switch (type) {
            case "name":
                setName(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "message":
                setMessage(value);
                break;
            case "subject":
                setSubject(value);
                break;
        }
    };

    const handleSubmit = async () => {

        if (name == "" || email == "" || message == "") {
            showContactError("Please fill in all fields.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            showContactError("Please enter a valid email address.");
            return;
        }

        const payload = {
            name: name,
            email: email,
            message: message
        }
        console.log(payload);

        await sendEmail();
    }

    const sendEmail = async () => {
        try {
            const client = new BrevoClient({
                apiKey: BREVO_API_KEY,
            });
            await client.transactionalEmails.sendTransacEmail({
                sender: {
                    email: "bhavikhpanchal1204@gmail.com",
                    name: "Bhavik Panchal",
                },
                templateId: 2,
                params: {
                    name: name,
                },
                to: [
                    {
                        email: email.trim(),
                        name: name,
                    },
                ],
            });
            toast.success("Response submitted successfully!");
            setName("");
            setEmail("");
            setMessage("");
            setSubject("");
        }
        catch (e) {
            console.error("Error sending email:", e);
            toast.error("Failed to submit response.");
        }
    }

    return (
        <section id="contact" className="py-24">
            <div className="max-w-6xl mx-auto px-6">
                <div className="bg-zinc-100 dark:bg-zinc-800 rounded-3xl p-10 md:p-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/10 rounded-full blur-2xl pointer-events-none" aria-hidden="true"></div>

                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-start">

                        <div>
                            <p className="reveal text-xs font-medium text-accent tracking-widest uppercase mb-3">Get in touch</p>
                            <h2 className="reveal d1 font-display font-bold text-4xl md:text-5xl text-zinc-900 dark:text-white leading-tight mb-5">Let's work<br />together</h2>
                            <p className="reveal d2 text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8">
                                I'm open to exciting web development opportunities, freelance projects, and collaborations — Let's talk!
                            </p>
                            <div className="reveal d3 flex flex-col gap-4">
                                <a href="mailto:bhavikpanchal2204@zohomail.in" className="group flex items-center gap-3 text-zinc-400 transition-colors">
                                    <span className="w-9 h-9 flex items-center justify-center bg-zinc-800 rounded-lg group-hover:bg-accent/20 transition-colors shrink-0">
                                        <MdEmail />
                                    </span>
                                    <span className="text-sm">bhavikpanchal2204@zohomail.in</span>
                                </a>
                                <a href="https://www.linkedin.com/in/bhavikhpanchal22" rel="noopener noreferrer" target="_blank" className="group flex items-center gap-3 text-zinc-400 transition-colors">
                                    <span className="w-9 h-9 flex items-center justify-center bg-zinc-800 rounded-lg group-hover:bg-accent/20 transition-colors shrink-0">
                                        <FaLinkedin />
                                    </span>
                                    <span className="text-sm">linkedin.com/in/bhavikhpanchal22</span>
                                </a>
                                <a href="https://github.com/bhaviik22" rel="noopener noreferrer" target="_blank" className="group flex items-center gap-3 text-zinc-400 transition-colors">
                                    <span className="w-9 h-9 flex items-center justify-center bg-zinc-800 rounded-lg group-hover:bg-accent/20 transition-colors shrink-0">
                                        <FaGithub />
                                    </span>
                                    <span className="text-sm">github.com/bhaviik22</span>
                                </a>
                            </div>
                        </div>

                        <div className="reveal d2">
                            <form action="#" method="POST">
                                <div className="flex flex-col gap-4">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Name <span aria-hidden="true">*</span></label>
                                            <input type="text" id="fname" name="name" value={name} placeholder="Jane Smith" onChange={(e) => handleInputChange("name", e.target.value)}
                                                className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm rounded-xl px-4 py-3 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-accent transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Email <span aria-hidden="true">*</span></label>
                                            <input type="email" id="femail" name="email" value={email} placeholder="jane@company.com" onChange={(e) => handleInputChange("email", e.target.value)}
                                                className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm rounded-xl px-4 py-3 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-accent transition-colors" />
                                        </div>
                                    </div>
                                    <div>
                                            <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Subject<span aria-hidden="true">*</span></label>
                                            <input type="text" id="fsubject" name="subject" value={subject} placeholder="Project Inquiry" onChange={(e) => handleInputChange("subject", e.target.value)}
                                                className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm rounded-xl px-4 py-3 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-accent transition-colors" />
                                        </div>
                                    <div>
                                        <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Message <span aria-hidden="true">*</span></label>
                                        <textarea id="fmessage" name="message" value={message} rows={7} placeholder="Tell me about your project..." onChange={(e) => handleInputChange("message", e.target.value)}
                                            className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm rounded-xl px-4 py-3 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-accent transition-colors resize-none" />
                                    </div>
                                    <button type="button" onClick={handleSubmit} className="shimmer w-full bg-accent text-white font-display font-bold text-sm py-3.5 rounded-xl hover:bg-accent-light transition-colors">
                                        Send message →
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactSection