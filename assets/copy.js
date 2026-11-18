document.addEventListener('click', async event => {
  const button = event.target.closest('.copy');
  if (!button) return;
  const box = button.closest('.prompt');
  const source = box.querySelector('pre');
  const status = box.querySelector('[role=status]');
  try {
    await navigator.clipboard.writeText(source.textContent);
    status.textContent = '복사했습니다';
  } catch {
    const range = document.createRange();
    range.selectNodeContents(source);
    const selection = getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = '본문을 선택했습니다. 복사 메뉴를 이용하세요.';
  }
});
