import React from 'react';
import ICONS from '../../../public/icons';

const CTA = ({ title, subText, btnText1, btnText2 }) => {
  return (
    <>
      <div class="mx-auto max-w-7xl flex items-center justify-center gap-6  w-full">
        <div class="md:w-2/3 relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            class="absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle
              cx="512"
              cy="512"
              r="512"
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fill-opacity="0.7"
            />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stop-color="#7775D6" />
                <stop offset="1" stop-color="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
          <div class="mx-auto max-w-3xl text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 class="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
              {title}
            </h2>
            <p class="mt-6 text-lg/8 text-pretty text-gray-300">{subText}</p>
            <div class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <a
                href="#"
                class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {btnText1}
              </a>
              <a href="#" class="text-sm/6 font-semibold text-white">
                {btnText2} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div class="relative mt-16 h-80 lg:mt-8">
            <img
              class="absolute top-0 left-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
              src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
              alt="App screenshot"
              width="1824"
              height="1080"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center md:w-1/3 w-full">
          <div className="w-full min-h-0.5">
            <ICONS.Linkedin className="w-12 h-12" />
            Linkedin
          </div>
          <div className="w-full min-h-0.5">
            <ICONS.Github className="w-12 h-12" />
            Github
          </div>
        </div>
      </div>
    </>
  );
};

export default CTA;
