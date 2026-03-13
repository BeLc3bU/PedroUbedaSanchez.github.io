import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TimelineItem from './TimelineItem';

describe('TimelineItem Component', () => {
    it('should render the title and subtitle correctly', () => {
        const { getByText } = render(
            <TimelineItem title="Test Title" subtitle="Test Subtitle" icon="🚀">
                <p>Test Content</p>
            </TimelineItem>
        );

        expect(getByText('Test Title')).toBeInTheDocument();
        expect(getByText('Test Subtitle')).toBeInTheDocument();
        expect(getByText('Test Content')).toBeInTheDocument();
    });

    it('should render the icon', () => {
        const { getByText } = render(
            <TimelineItem title="Test Title" subtitle="Test Subtitle" icon="🚀">
                <p>Test Content</p>
            </TimelineItem>
        );

        expect(getByText('🚀')).toBeInTheDocument();
    });
});
