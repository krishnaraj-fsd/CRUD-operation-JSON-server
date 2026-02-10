import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-gray-300 border-t border-gray-800 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">

                <p className="text-sm text-center md:text-left">
                    © {new Date().getFullYear()} <Link className="underline" to={'https://krishnaraj-fsd.vercel.app/'} target="_blank">Krishnaraj</Link>. All rights reserved.
                </p>

                <div className="flex gap-5 items-center">
                    <a
                        href="https://github.com/krishnaraj-fsd/CRUD-operation-JSON-server/tree/main"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-white transition transform hover:scale-110"
                    >
                        <Github size={18} />
                        <span className="hidden sm:inline">GitHub</span>
                    </a>

                    <a
                        href="https://www.linkedin.com/in/krishnaraj-fsd/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-white transition transform hover:scale-110"
                    >
                        <Linkedin size={18} />
                        <span className="hidden sm:inline">LinkedIn</span>
                    </a>

                    <a
                        href="mailto:krishnarajs2802@gmail.com"
                        className="flex items-center gap-2 hover:text-white transition transform hover:scale-110"
                    >
                        <Mail size={18} />
                        <span className="hidden sm:inline">Email</span>
                    </a>
                </div>


            </div>
        </footer>
    );
}
