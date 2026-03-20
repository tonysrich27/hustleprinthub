/**
 * Order submission utility
 * Hook up to: admin email, Google Sheets, or API
 */

export interface OrderPayload {
  product: string;
  customer: { name: string; email: string; phone: string; notes: string };
  details: Record<string, unknown>;
  total?: number;
  files?: File[];
}

export async function submitOrder(payload: OrderPayload): Promise<{ success: boolean; error?: string }> {
  try {
    // TODO: Send to admin email, save to DB/Sheets, trigger automation
    console.log('Order submitted:', {
      ...payload,
      files: payload.files?.map((f) => f.name),
    });

    // Simulate API call - replace with actual implementation
    // await fetch('/api/orders', { method: 'POST', body: JSON.stringify(payload) });

    return { success: true };
  } catch (err) {
    console.error('Order submission failed:', err);
    return { success: false, error: String(err) };
  }
}
