const crypto = require('crypto');
const { performance } = require('perf_hooks');

// Generate mock posts
const numPosts = 100000;
const posts = Array.from({ length: numPosts }, () => ({
  id: crypto.randomUUID(),
  published: Math.random() > 0.5,
}));

function benchmarkOriginal() {
  const start = performance.now();
  for (let i = 0; i < 1000; i++) {
    const published = posts.filter(p => p.published).length;
    const drafts = posts.filter(p => !p.published).length;
  }
  const end = performance.now();
  return end - start;
}

function benchmarkOptimized() {
  const start = performance.now();
  for (let i = 0; i < 1000; i++) {
    let publishedCount = 0;
    for (let j = 0; j < posts.length; j++) {
      if (posts[j].published) {
        publishedCount++;
      }
    }
    const draftsCount = posts.length - publishedCount;
  }
  const end = performance.now();
  return end - start;
}

const originalTime = benchmarkOriginal();
const optimizedTime = benchmarkOptimized();

console.log(`Original Time: ${originalTime.toFixed(2)} ms`);
console.log(`Optimized Time: ${optimizedTime.toFixed(2)} ms`);
console.log(`Improvement: ${((originalTime - optimizedTime) / originalTime * 100).toFixed(2)}%`);
