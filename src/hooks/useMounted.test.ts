import { renderHook } from '@testing-library/react-hooks';

import { useMounted } from './useMounted';

test('should be mounted', () => {
  const { result } = renderHook(() => useMounted());
  const isMounted = result.current;
  expect(isMounted.current).toBe(true);
});

test('should be unmounted', () => {
  const { result, unmount } = renderHook(() => useMounted());
  unmount();
  const isMounted = result.current;
  expect(isMounted.current).toBe(false);
});
