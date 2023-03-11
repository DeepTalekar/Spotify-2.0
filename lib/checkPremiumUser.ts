export async function isPremiumUser(
  user,
  callbackForPremiumUser,
  callbackForNonPremiumUser
): Promise<void> {
  if (Boolean(user?.hasOwnProperty('product')) && user?.product === 'premium') {
    await callbackForPremiumUser();
  } else {
    await callbackForNonPremiumUser();
  }
}
