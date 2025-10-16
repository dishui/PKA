import Link from 'next/link'
import Image from 'next/image'
import { footerData, aboutText } from '@/data/mockData'

export default function Footer() {
  return (
    <footer className="font-sans tracking-wide bg-gray-100 px-10 pt-8 pb-3">
      <div className="flex flex-wrap justify-around gap-5">
          
          {/* About Section with Social - Column 1 */}
          <div className="max-w-md space-y-3">
            <Link className="contents w-2" href="https://www.blossend.com">
              <Image
                src="/assets/images/logo.png"
                alt="logo"
                loading="lazy"
                width={200}
                height={200}
                className="p-[0.5rem] bg-white mb-1 rounded-lg border-[1px] border-[#0077b6] hover:scale-110 duration-200 ease-in"
              />
            </Link>
            <div className="mt-6">
              <p className="text-gray-600 leading-relaxed text-sm">
                <Link 
                  className="hover:text-gray-800 text-gray-600 text-sm underline font-semibold"
                  href="https://www.blossend.com/about"
                >
                  About
                </Link>
                : {aboutText}
              </p>
            </div>
            {/* Social Media Icons */}
            <ul className="mt-10 flex space-x-5">
              {footerData.social.map((social, index) => (
                <li key={index}>
                  <a href={social.url}>
                    {social.icon === 'whatsapp' && (
                      <svg className="h-10 w-10 text-gray-600" focusable="false" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.78.91.88 1.71 1.17 1.95 1.3.24.14.39.12.54-.04l.81-.94c.19-.25.35-.19.58-.11l1.67.88M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.97 0-3.8-.57-5.35-1.55L2 22l1.55-4.65A9.969 9.969 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z"/>
                      </svg>
                    )}
                    {social.icon === 'linkedin' && (
                      <svg className="h-10 w-10 text-gray-600" focusable="false" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                      </svg>
                    )}
                    {social.icon === 'instagram' && (
                      <svg className="h-10 w-10 text-gray-600" focusable="false" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                      </svg>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Download Section - Column 2 */}
          <div className="max-lg:min-w-[140px]">
            <h4 className="text-gray-800 font-semibold text-base relative max-sm:cursor-pointer">Download</h4>
            <ul className="mt-6 space-y-4">
              <li>
                <a href={footerData.download.appStore.url}>
                  <Image
                    src={footerData.download.appStore.image}
                    alt={footerData.download.appStore.alt}
                    loading="lazy"
                    width={200}
                    height={50}
                    className="cursor-pointer hover:scale-95 duration-150 ease-in-out h-13.5 w-44"
                  />
                </a>
              </li>
              <li>
                <a href={footerData.download.googlePlay.url}>
                  <Image
                    src={footerData.download.googlePlay.image}
                    alt={footerData.download.googlePlay.alt}
                    loading="lazy"
                    width={200}
                    height={50}
                    className="cursor-pointer hover:scale-95 duration-150 ease-in-out h-13.5 w-44"
                  />
                </a>
              </li>
            </ul>
          </div>

          {/* Useful Links - Column 3 */}
          <div className="max-lg:min-w-[140px]">
            <h4 className="text-gray-800 font-semibold text-base relative max-sm:cursor-pointer">Useful Links</h4>
            <ul className="space-y-1 mt-6">
              {footerData.usefulLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="hover:text-gray-800 text-gray-600 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact - Column 4 */}
          <div className="max-lg:min-w-[140px]">
            <h4 className="text-gray-800 font-semibold text-base relative max-sm:cursor-pointer">Contact</h4>
            <ul className="space-y-4 mt-6">
              <li>
                <div className="hover:text-gray-800 text-gray-600 text-sm">{footerData.company.name}</div>
                <div className="hover:text-gray-800 text-gray-600 text-sm">{footerData.company.location}</div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section - Copyright and Legal */}
        <hr className="mt-2 mb-3 border-gray-300" />
        <div className="max-w-screen-xl mx-auto text-center">
          <p className="text-gray-600 text-sm">
            {footerData.copyright.split('Blossend')[0]}
            <span className="inline-flex underline">
              <Link className="contents w-2" href="https://www.blossend.com">
                Blossend
              </Link>
            </span>
            {footerData.copyright.split('Blossend')[1]}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <ul className="md:flex md:space-x-6 max-md:space-y-2">
            {footerData.legal.map((link, index) => (
              <li key={index} className="flex items-center">
                <Link
                  href={link.href}
                  className="hover:text-gray-800 text-gray-600 text-sm"
                >
                  {link.label}
                </Link>
                {index < footerData.legal.length - 1 && (
                  <div className="border-l border-[#333] h-6 max-lg:hidden ml-6"></div>
                )}
              </li>
            ))}
          </ul>
        </div>
    </footer>
  )
}
