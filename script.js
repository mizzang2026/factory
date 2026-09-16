const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i % 4, 3) * 70}ms`;
  observer.observe(el);
});

document.querySelector('#inquiry-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const button = form.querySelector('button[type="submit"]');
  const toast = document.querySelector('.toast');
  const originalLabel = button.innerHTML;
  button.disabled = true;
  button.innerHTML = '전송 중입니다… <b>↗</b>';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) throw new Error('전송 실패');
    toast.textContent = '상담 신청이 접수되었습니다. 빠르게 연락드릴게요.';
    form.reset();
  } catch (error) {
    toast.textContent = '전송하지 못했습니다. 잠시 후 다시 시도해 주세요.';
  } finally {
    toast.classList.add('show');
    button.disabled = false;
    button.innerHTML = originalLabel;
    setTimeout(() => toast.classList.remove('show'), 4000);
  }
});

document.querySelector('.menu-btn').addEventListener('click', () => {
  document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
});
