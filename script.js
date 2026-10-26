(() => {
  'use strict';
  const cards = [...document.querySelectorAll('.work-card')];
  const filters = [...document.querySelectorAll('[data-filter]')];
  const count = document.getElementById('result-count');
  document.body.classList.add('js-filters-ready');
  const dialog = document.getElementById('work-dialog');
  const slot = document.getElementById('dialog-content');
  let activeDetail = null;
  let returnFocus = null;
  let previousHash = '';

  function filterWorks(category) {
    let visible = 0;
    cards.forEach(card => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
      if (!card.hidden) visible++;
    });
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
    count.textContent = String(visible).padStart(2, '0');
  }
  filters.forEach(button => button.addEventListener('click', () => filterWorks(button.dataset.filter)));
  document.querySelectorAll('[data-filter-link]').forEach(link => link.addEventListener('click', () => filterWorks(link.dataset.filterLink)));

  if (typeof dialog.showModal === 'function') {
    document.body.classList.add('js-ready');
    function restoreDetail() {
      if (activeDetail) {
        activeDetail.section.querySelectorAll('video, audio').forEach(media => media.pause());
        activeDetail.marker.replaceWith(activeDetail.section);
        activeDetail = null;
      }
      document.body.classList.remove('dialog-open');
    }
    function openDetail(id, trigger, updateUrl = true) {
      const section = document.getElementById(id);
      if (!section || !section.classList.contains('work-detail')) return;
      if (dialog.open) dialog.close();
      restoreDetail();
      previousHash = window.location.hash;
      returnFocus = trigger || null;
      const marker = document.createComment(`detail:${id}`);
      section.replaceWith(marker);
      slot.replaceChildren(section);
      activeDetail = { section, marker };
      dialog.setAttribute('aria-labelledby', `title-${id}`);
      dialog.showModal();
      document.body.classList.add('dialog-open');
      dialog.scrollTop = 0;
      if (updateUrl) history.replaceState(null, '', `#${id}`);
      section.querySelector('.close-detail').focus({ preventScroll: true });
    }
    function closeDetail() {
      if (!dialog.open) return;
      dialog.close();
    }
    document.querySelectorAll('[data-open]').forEach(link => link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      openDetail(link.dataset.open, link);
    }));
    dialog.addEventListener('click', event => {
      if (event.target.closest('.close-detail')) closeDetail();
      if (event.target === dialog) {
        const bounds = dialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeDetail();
      }
    });
    dialog.addEventListener('close', () => {
      if (dialog.open) return;
      restoreDetail();
      if (window.location.hash && !['#top', '#works', '#members'].includes(window.location.hash)) {
        history.replaceState(null, '', previousHash && previousHash !== window.location.hash ? previousHash : '#works');
      }
      if (returnFocus && returnFocus.isConnected) returnFocus.focus({ preventScroll: true });
    });
    window.addEventListener('hashchange', () => {
      const id = window.location.hash.slice(1);
      if (document.getElementById(id)?.classList.contains('work-detail')) openDetail(id, null, false);
      else if (dialog.open) closeDetail();
    });
    if (window.location.hash) openDetail(window.location.hash.slice(1), null, false);
  }

  // Keep the printout useful when it is saved as a PDF.
  cards.forEach(card => {
    const target = document.getElementById(card.querySelector('[data-open]').dataset.open);
    const externalLink = target?.querySelector('.detail-links a');
    if (externalLink) {
      const printLink = document.createElement('a');
      printLink.className = 'print-url';
      printLink.href = externalLink.href;
      printLink.textContent = externalLink.href;
      card.append(printLink);
    }
  });
  document.querySelector('.print-button').addEventListener('click', () => window.print());
})();
