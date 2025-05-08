import { IShippingAddress } from '../Interfaces/IShipping';
import { toast } from 'react-hot-toast';

export const initiatePayment = async (
  cartId: string,
  shippingAddress: IShippingAddress,
  returnUrl: string,
  trigger: ReturnType<typeof import('../features/orderApi/orderApi').useCreateCheckoutSessionMutation>[0]
) => {
  const loadingToast = toast.loading('Preparing payment...');

  try {
    const res = await trigger({
      cartId,
      returnUrl,
      shippingAddress,
    }).unwrap(); // Now correctly recognized
    toast.dismiss(loadingToast);
    toast.success('Redirecting...');
    setTimeout(() => {
      window.location.href = res.session.url;
    }, 500);
  } catch (error) {
    toast.dismiss(loadingToast);
    toast.error('Payment failed, try again.');
    console.error(error);
  }
};
