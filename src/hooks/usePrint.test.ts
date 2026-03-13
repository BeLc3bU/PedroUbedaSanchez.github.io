import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePrint } from './usePrint';

beforeEach(() => {
  vi.clearAllMocks();
  // Reset document body
  document.body.innerHTML = '';
});

describe('usePrint', () => {
  it('returns handlePrint function', () => {
    const { result } = renderHook(() => usePrint());
    expect(result.current.handlePrint).toBeDefined();
    expect(typeof result.current.handlePrint).toBe('function');
  });

  it('creates iframe on first print call', () => {
    const { result } = renderHook(() => usePrint());
    const mockEvent = { preventDefault: vi.fn() } as unknown as React.MouseEvent;
    
    act(() => {
      result.current.handlePrint(mockEvent, '/cv');
    });
    
    const iframe = document.getElementById('print-iframe-cv');
    expect(iframe).toBeInTheDocument();
    expect(iframe?.getAttribute('src')).toBe('/cv');
  });

  it('reuses existing iframe on subsequent calls', () => {
    const { result } = renderHook(() => usePrint());
    const mockEvent = { preventDefault: vi.fn() } as unknown as React.MouseEvent;
    
    // First call
    act(() => {
      result.current.handlePrint(mockEvent, '/cv');
    });
    
    const firstIframe = document.getElementById('print-iframe-cv');
    expect(firstIframe).toBeInTheDocument();
    
    // Second call
    act(() => {
      result.current.handlePrint(mockEvent, '/cv');
    });
    
    // Should be the same iframe
    const iframes = document.querySelectorAll('#print-iframe-cv');
    expect(iframes.length).toBe(1);
  });

  it('prevents default event behavior', () => {
    const { result } = renderHook(() => usePrint());
    const mockPreventDefault = vi.fn();
    const mockEvent = { preventDefault: mockPreventDefault } as unknown as React.MouseEvent;
    
    act(() => {
      result.current.handlePrint(mockEvent, '/cv');
    });
    
    expect(mockPreventDefault).toHaveBeenCalled();
  });
});
