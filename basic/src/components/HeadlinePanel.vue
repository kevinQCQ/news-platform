<template>
    <div class="panel-wrap">
        <div class="panel-header">
            <div class="header-left">
                <span class="square"></span>
                <span class="title">{{ leftTitle }}</span>
            </div>
            <div class="header-right">
                <template v-for="(tab, i) in resolvedTabs" :key="i">
                    <button class="tab-btn" :class="{ active: i === currentIndex }" @click="currentIndex = i">
                        {{ tab.label }}
                    </button>
                    <span v-if="i !== resolvedTabs.length - 1" class="sep"> · </span>
                </template>
                <span class="corner"></span>
            </div>
        </div>
        <ul class="news-list">
            <li v-for="(item, idx) in currentItems" :key="idx" class="news-item" @click="$emit('select', item, idx)">
                <span class="dot">•</span>
                <span class="text" :title="typeof item === 'string' ? item : item.text">
                    {{ typeof item === 'string' ? item : item.text }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed, watch } from 'vue'

defineEmits(['select'])

const props = defineProps({
    leftTitle: { type: String, default: '要闻资讯' },
    rightTitle: { type: String, default: '通知公告' },
    items: { // 兼容旧用法：单列表
        type: Array,
        default: null
    },
    tabs: { // 新：多标签列表 [{ label, items }]
        type: Array,
        default: () => ([
            {
                label: '通知公告',
                items: [
                    '农业农村部召开推进巩固拓展脱贫攻坚成果考核评估发现问题整改',
                    '韩俊：聚焦主责主业 以新作风新作为支撑服务农业农村高质量发展',
                    '2025乡村振兴（长沙）论坛举行',
                    '农业农村部召开防汛抗旱救灾工作调度视频会'
                ]
            },
            {
                label: '振兴要闻',
                items: [
                    '中央单位定点帮扶工作培训班在贵州省黔西南州举办',
                    '全国农村厕所革命暨人居环境整治提升现场会在湖北武汉召开',
                    '刘国中：不误农时抓紧抓好农业生产工作 牢牢兜住巩固拓展脱贫攻坚成果',
                    '中央专项彩票公益金支持革命老区乡村振兴项目工作推进会在山东召开'
                ]
            }
        ])
    },
    activeIndex: { type: Number, default: 0 }
})

const currentIndex = ref(props.activeIndex)

watch(() => props.activeIndex, (val) => { currentIndex.value = val })

// 将传入的 tabs 或旧 items 统一为 tabs 结构
const resolvedTabs = computed(() => {
    if (Array.isArray(props.tabs) && props.tabs.length > 0) return props.tabs
    if (Array.isArray(props.items)) return [{ label: props.rightTitle || '通知公告', items: props.items }]
    return []
})

const currentItems = computed(() => {
    const t = resolvedTabs.value[currentIndex.value]
    return t && Array.isArray(t.items) ? t.items : []
})

const { leftTitle } = props
</script>

<style scoped>
.panel-wrap {
    border: 1px solid #e5e6eb;
    background-color: #fff;
    border-radius: 2px;
}

.panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    border-bottom: 1px solid #f0f0f0;
}

.header-left {
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.square {
    width: 14px;
    height: 14px;
    background-color: #e60012;
    border-radius: 2px;
    display: inline-block;
}

.title {
    font-size: 20px;
    font-weight: 700;
    color: #e60012;
}

.header-right {
    position: relative;
    color: #e60012;
    font-weight: 700;
}

.tab-btn {
    appearance: none;
    border: none;
    background: transparent;
    color: #9a9a9a;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    padding: 0 2px;
}

.tab-btn:hover {
    text-decoration: underline;
}

.tab-btn.active {
    color: #e60012;
    text-decoration: underline;
}

.sep {
    color: #bfbfbf;
    margin: 0 2px;
}

.corner {
    position: absolute;
    right: -10px;
    top: -10px;
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-top: 12px solid #e60012;
    transform: rotate(45deg);
}

.news-list {
    list-style: none;
    margin: 0;
    padding: 10px 16px 14px 16px;
}

.news-item {
    display: flex;
    align-items: center;
    gap: 8px;
    line-height: 1.6;
    padding: 6px 0;
    cursor: pointer;
}

.news-item:hover .text {
    color: #e60012;
    text-decoration: underline;
}

.dot {
    color: #606266;
    font-weight: 700;
}

.text {
    color: #333;
    font-size: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
}

@media (max-width: 768px) {
    .title {
        font-size: 18px;
    }

    .right-text {
        font-size: 16px;
    }

    .text {
        font-size: 14px;
    }
}
</style>
