import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TimelineItem from './TimelineItem';

describe('TimelineItem Component', () => {
    it('should render the title and subtitle correctly', () => {
        render(
            <TimelineItem title="Test Title" subtitle="Test Subtitle" icon="🚀">
                <p>Test Content</p>
            </TimelineItem>
        );

        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should render the icon', () => {
        render(
            <TimelineItem title="Test Title" subtitle="Test Subtitle" icon="🚀">
                <p>Test Content</p>
            </TimelineItem>
        );

        expect(screen.getByText('🚀')).toBeInTheDocument();
    });
});
