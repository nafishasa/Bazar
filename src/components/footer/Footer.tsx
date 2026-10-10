

const Footer = () => {
    return (
        <footer className="mt-10 border-t border-gray-200 bg-white">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
                    {/* left */}
                    <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-base">
                            🧺
                        </span>
                        <p className="text-sm font-semibold text-gray-900">
                            বাজার দর{' '}
                            <span className="font-normal text-gray-600">
                                — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                            </span>
                        </p>
                    </div>

                    {/* right */}
                    <p className="max-w-md rounded-full bg-emerald-50 px-4 py-1.5 text-xs text-emerald-700">
                        সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;