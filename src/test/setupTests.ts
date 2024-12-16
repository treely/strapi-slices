import '@testing-library/jest-dom';
import matchMediaPolyfill from 'mq-polyfill';
import resizeObserverPolyfill from 'resize-observer-polyfill';

matchMediaPolyfill(window);
global.scrollTo = jest.fn();
global.ResizeObserver = resizeObserverPolyfill;
