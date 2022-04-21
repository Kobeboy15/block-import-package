import { useRouter } from 'next/router';
import { getPreviewHostParams } from '../getPreviewHostParams';

export function useEditModeParams() {
  const { query } = useRouter();
  const previewParams = getPreviewHostParams(query);
  return { ...previewParams };
}
