// assets/content-map.js
// 站点内容分区、关键词标签与搜索过滤函数

const siteContentMap = {
  url: 'https://official-portal-leyu.com.cn',
  keyword: '乐鱼体育',
  sections: [
    {
      id: 'home',
      title: '首页',
      tags: ['乐鱼体育', '首页推荐', '最新动态'],
      keywords: ['乐鱼体育', '首页', '推荐'],
      items: [
        { id: 'item-001', label: '热门赛事', tags: ['乐鱼体育', '热门'] },
        { id: 'item-002', label: '焦点新闻', tags: ['乐鱼体育', '新闻'] }
      ]
    },
    {
      id: 'live',
      title: '直播',
      tags: ['乐鱼体育', '直播', '实时'],
      keywords: ['乐鱼体育', '直播', '赛事直播'],
      items: [
        { id: 'item-003', label: '足球直播', tags: ['乐鱼体育', '足球'] },
        { id: 'item-004', label: '篮球直播', tags: ['乐鱼体育', '篮球'] }
      ]
    },
    {
      id: 'result',
      title: '赛果',
      tags: ['乐鱼体育', '比分', '赛果'],
      keywords: ['乐鱼体育', '比分', '赛果数据'],
      items: [
        { id: 'item-005', label: '足球赛果', tags: ['乐鱼体育', '足球', '赛果'] },
        { id: 'item-006', label: '篮球赛果', tags: ['乐鱼体育', '篮球', '赛果'] }
      ]
    },
    {
      id: 'stats',
      title: '数据统计',
      tags: ['乐鱼体育', '统计', '数据'],
      keywords: ['乐鱼体育', '统计', '数据分析'],
      items: [
        { id: 'item-007', label: '球队排行', tags: ['乐鱼体育', '球队', '排行'] },
        { id: 'item-008', label: '球员数据', tags: ['乐鱼体育', '球员', '数据'] }
      ]
    }
  ]
};

/**
 * 根据关键词搜索分区和内容项
 * @param {string} query - 用户输入的关键词
 * @returns {Array} 匹配的分区对象列表（含匹配的 items）
 */
function searchSections(query) {
  if (!query || typeof query !== 'string') return [];
  const q = query.trim().toLowerCase();
  const results = [];

  for (const section of siteContentMap.sections) {
    const matchTags = section.tags.some(tag => tag.toLowerCase().includes(q));
    const matchKeywords = section.keywords.some(kw => kw.toLowerCase().includes(q));
    const matchTitle = section.title.toLowerCase().includes(q);

    let matchedItems = [];
    if (matchTags || matchKeywords || matchTitle) {
      matchedItems = section.items;
    } else {
      matchedItems = section.items.filter(item =>
        item.tags.some(tag => tag.toLowerCase().includes(q)) ||
        item.label.toLowerCase().includes(q)
      );
    }

    if (matchedItems.length > 0) {
      results.push({
        sectionId: section.id,
        sectionTitle: section.title,
        matchedItems: matchedItems
      });
    }
  }

  return results;
}

/**
 * 按标签过滤所有分区中的内容项
 * @param {string} tag - 目标标签
 * @returns {Array} 包含所有匹配 item 的数组
 */
function filterByTag(tag) {
  if (!tag || typeof tag !== 'string') return [];
  const t = tag.trim().toLowerCase();
  const matches = [];

  for (const section of siteContentMap.sections) {
    for (const item of section.items) {
      if (item.tags.some(igt => igt.toLowerCase().includes(t))) {
        matches.push({
          sectionId: section.id,
          sectionTitle: section.title,
          item: item
        });
      }
    }
  }

  return matches;
}

/**
 * 获取某个分区下的所有标签（去重）
 * @param {string} sectionId - 分区标识
 * @returns {string[]} 标签列表
 */
function getTagsForSection(sectionId) {
  const section = siteContentMap.sections.find(s => s.id === sectionId);
  if (!section) return [];
  const tagSet = new Set();
  section.tags.forEach(t => tagSet.add(t));
  section.items.forEach(item => item.tags.forEach(t => tagSet.add(t)));
  return Array.from(tagSet);
}

/**
 * 获取全站所有标签（去重）
 * @returns {string[]} 全站标签列表
 */
function getAllTags() {
  const tagSet = new Set();
  for (const section of siteContentMap.sections) {
    section.tags.forEach(t => tagSet.add(t));
    section.items.forEach(item => item.tags.forEach(t => tagSet.add(t)));
  }
  return Array.from(tagSet);
}

// 导出以便在模块中使用（如果环境支持）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    siteContentMap,
    searchSections,
    filterByTag,
    getTagsForSection,
    getAllTags
  };
}