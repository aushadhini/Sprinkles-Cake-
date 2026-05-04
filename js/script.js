// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    item.classList.toggle('open');
  });
});

// Customize preview
function updatePreview() {
  const name = document.getElementById('cust-name')?.value || '—';
  const flavor = document.getElementById('cust-flavor')?.value || '—';
  const msg = document.getElementById('cust-message')?.value || '—';
  const size = document.getElementById('cust-size')?.value || '—';

  const flavors = { chocolate: '🍫', strawberry: '🍓', vanilla: '🎂', caramel: '🍯', redvelvet: '🎂', lemon: '🍋' };
  const emoji = flavors[flavor] || '🎂';

  if (document.getElementById('prev-emoji')) document.getElementById('prev-emoji').textContent = emoji;
  if (document.getElementById('prev-name')) document.getElementById('prev-name').textContent = name;
  if (document.getElementById('prev-flavor')) document.getElementById('prev-flavor').textContent = flavor;
  if (document.getElementById('prev-msg')) document.getElementById('prev-msg').textContent = msg;
  if (document.getElementById('prev-size')) document.getElementById('prev-size').textContent = size;
}

// Shop filters
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.product-card').forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});