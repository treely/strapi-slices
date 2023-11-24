import '@testing-library/jest-dom';
import matchMediaPolyfill from 'mq-polyfill';

matchMediaPolyfill(window);
global.scrollTo = jest.fn();
