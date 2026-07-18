import { TimeConverter } from '../TimeConverter';

describe('TimeConverter', () => {
  const testDate = '2026-01-15T14:30:00Z';

  it('should format date correctly', () => {
    const formatted = TimeConverter.formatDate(testDate);
    expect(formatted).toContain('Jan');
    expect(formatted).toContain('2026');
    expect(formatted).toContain('15');
  });

  it('should format time correctly', () => {
    const formatted = TimeConverter.formatTime(testDate);
    // Should contain AM/PM format
    expect(formatted).toMatch(/\d{1,2}:\d{2}\s?(AM|PM)/i);
  });

  it('should convert to GMT string', () => {
    const gmt = TimeConverter.toGmtString(testDate);
    expect(gmt).toContain('GMT');
  });

  it('should return a timeAgo string', () => {
    const recentDate = new Date(Date.now() - 60000).toISOString(); // 1 minute ago
    const result = TimeConverter.timeAgo(recentDate);
    expect(result).toContain('minute');
    expect(result).toContain('ago');
  });
});
