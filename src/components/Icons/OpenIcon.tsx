import { IconsProps } from 'types/Icons';

function OpenIcon({ fill = 'var(--dark-black)' }: IconsProps) {
  return (
    <svg width="19" height="24" viewBox="0 0 19 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.51025 15.5088C10.0537 15.5088 10.4844 15.0781 10.4844 14.5552V4.88574L10.4023 3.4502L10.9766 4.17822L12.2788 5.5625C12.4429 5.74707 12.6787 5.84961 12.9146 5.84961C13.3862 5.84961 13.7759 5.51123 13.7759 5.01904C13.7759 4.77295 13.6836 4.58838 13.5093 4.41406L10.2588 1.28662C10.0127 1.04053 9.7666 0.958496 9.51025 0.958496C9.25391 0.958496 9.01807 1.04053 8.76172 1.28662L5.52148 4.41406C5.34717 4.58838 5.24463 4.77295 5.24463 5.01904C5.24463 5.51123 5.63428 5.84961 6.0957 5.84961C6.3418 5.84961 6.57764 5.74707 6.75195 5.5625L8.04395 4.17822L8.62842 3.4502L8.54639 4.88574V14.5552C8.54639 15.0781 8.97705 15.5088 9.51025 15.5088ZM3.90137 23.3223H15.0884C17.2314 23.3223 18.3491 22.2046 18.3491 20.0923V10.6177C18.3491 8.50537 17.2314 7.3877 15.0884 7.3877H12.5146V9.48975H14.9243C15.7754 9.48975 16.2573 9.93066 16.2573 10.833V19.877C16.2573 20.7793 15.7754 21.2202 14.9243 21.2202H4.07568C3.21436 21.2202 2.74268 20.7793 2.74268 19.877V10.833C2.74268 9.93066 3.21436 9.48975 4.07568 9.48975H6.51611V7.3877H3.90137C1.77881 7.3877 0.640625 8.50537 0.640625 10.6177V20.0923C0.640625 22.2046 1.77881 23.3223 3.90137 23.3223Z"
        fill={fill}
      />
    </svg>
  );
}

export default OpenIcon;
