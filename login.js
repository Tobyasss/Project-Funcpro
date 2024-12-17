async function LoginScreen(username, password) {
  const { data, error } = await supabase
  .from('users')
  .select('id, username, points, isAdmin')
  .eq('username', username)
  .eq('password', password)
  .single();

  if (error) {
  console.error('Login failed:', error.message);
  return null;
  }
  console.log('Login successful:', data);
  return data;
}

async function updateUserPoints(userId, points) {
  const { data, error } = await supabase
    .from('users')
    .update({ points })
    .eq('id', userId);
  if (error) {
    console.error('Error updating points:', error.message);
  } else {
    console.log('User points updated:', data);
  }
 }

 async function createReward(name, required_points, stock) {
  const { data, error } = await supabase
    .from('rewards')
    .insert([{ name, required_points, stock }]);
  if (error) {
    console.error('Error creating reward:', error.message);
  } else {
    console.log('Reward created:', data);
  }
 }

 async function getAllRewards() {
  const { data, error } = await supabase.from('rewards').select('*');
  if (error) {
    console.error('Error fetching rewards:', error.message);
  } else {
    console.log('All rewards:', data);
    return data;
  }
 }

 async function updateRewardStock(rewardId, newStock) {
  const { data, error } = await supabase
    .from('rewards')
    .update({ stock: newStock })
    .eq('id', rewardId);
  if (error) {
    console.error('Error updating stock:', error.message);
  } else {
    console.log('Reward stock updated:', data);
  }
 }

 async function deleteReward(rewardId) {
  const { data, error } = await supabase
    .from('rewards')
    .delete()
    .eq('id', rewardId);
  if (error) {
    console.error('Error deleting reward:', error.message);
  } else {
    console.log('Reward deleted:', data);
  }
 }

 async function createHistory(userId, rewardId, pointsUsed) {
  const { data, error } = await supabase.from('history').insert([
    {
      user_id: userId,
      reward_id: rewardId,
      points_used: pointsUsed,
      redeemed_at: new Date(),
    },
  ]);

  if (error) {
    console.error('Error creating history:', error.message);
  } else {
    console.log('History created:', data);
  }
 }

 async function getUserHistory(userId) {
  const { data, error } = await supabase
    .from('history')
    .select('id, reward_id, points_used, redeemed_at')
    .eq('user_id', userId);
  if (error) {
    console.error('Error fetching history:', error.message);
  } else {
    console.log('User history:', data);
    return data;
  }
 }