// ==UserScript==
// @name         ChatGPT 对话预览与跳转
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  在ChatGPT页面添加一个对话预览与跳转功能，支持按钮悬停预览和对话项悬停展开。
// @author       BPsoda
// @match        https://chatgpt.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // 创建主 TOC 容器
    const tocContainer = document.createElement('div');
    tocContainer.id = 'tocContainer';
    Object.assign(tocContainer.style, {
        position: 'fixed',
        right: '10px',
        top: '60px',
        width: '240px',
        maxHeight: '70vh',
        overflowY: 'auto',
        backgroundColor: '#ffffff',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        padding: '8px',
        zIndex: '1000',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        display: 'block',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        fontSize: '14px',
        color: '#111827',
        transition: 'opacity 0.2s ease'
    });

    // 创建预览窗口（用于按钮悬停时显示）
    const previewContainer = document.createElement('div');
    previewContainer.id = 'previewContainer';
    Object.assign(previewContainer.style, {
        position: 'fixed',
        right: '50px',
        top: '60px',
        width: '240px',
        maxHeight: '70vh',
        overflowY: 'auto',
        backgroundColor: '#ffffff',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        padding: '8px',
        zIndex: '1002',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        display: 'none',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        fontSize: '14px',
        color: '#111827',
        transition: 'opacity 0.2s ease'
    });

    // 创建切换按钮（ChatGPT 风格）
    const toggleButton = document.createElement('div');
    toggleButton.id = 'tocToggleButton';
    toggleButton.innerHTML = '━';
    Object.assign(toggleButton.style, {
        position: 'fixed',
        right: '10px',
        top: '30px',
        width: '36px',
        height: '36px',
        padding: '0',
        textAlign: 'center',
        cursor: 'pointer',
        zIndex: '1001',
        backgroundColor: '#f3f4f6',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        color: '#374151',
        transition: 'all 0.2s ease',
        lineHeight: '36px',
        userSelect: 'none',
        fontSize: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    });

    // 同步预览窗口内容的函数
    function syncPreviewContent() {
        if (isUpdating) return; // 如果正在更新，不执行同步
        if (previewContainer.style.display === 'block') {
            previewContainer.innerHTML = tocContainer.innerHTML;
            // 为预览窗口中的项目添加相同的悬停和点击事件
            const previewItems = previewContainer.querySelectorAll('.toc-item');
            previewItems.forEach((item, index) => {
                const textDisplay = item.querySelector('.toc-item-text');
                const expandedText = item.querySelector('.toc-item-expanded');
                if (textDisplay && expandedText) {
                    // 确保预览窗口中的项目也使用增大的高度
                    textDisplay.style.maxHeight = '2.25em';
                    textDisplay.style.minHeight = '2.25em';
                    
                    const questionId = `question-${index}`;
                    const scrollToQuestion = function() {
                        document.getElementById(questionId).scrollIntoView({ behavior: 'smooth' });
                    };
                    textDisplay.onclick = scrollToQuestion;
                    expandedText.onclick = scrollToQuestion;
                    
                    // 添加悬停展开功能（与主容器相同）
                    let hideTimeout = null;
                    textDisplay.onmouseenter = function() {
                        if (hideTimeout) {
                            clearTimeout(hideTimeout);
                            hideTimeout = null;
                        }
                        textDisplay.style.display = 'none';
                        expandedText.style.display = 'block';
                        requestAnimationFrame(() => {
                            expandedText.style.maxHeight = '15em';
                            expandedText.style.opacity = '1';
                            expandedText.style.backgroundColor = '#f3f4f6';
                        });
                    };
                    textDisplay.onmouseleave = function() {
                        hideTimeout = setTimeout(() => {
                            if (!expandedText.matches(':hover')) {
                                expandedText.style.maxHeight = '0';
                                expandedText.style.opacity = '0';
                                setTimeout(() => {
                                    expandedText.style.display = 'none';
                                    textDisplay.style.display = 'block';
                                }, 300);
                            }
                        }, 150);
                    };
                    expandedText.onmouseenter = function() {
                        if (hideTimeout) {
                            clearTimeout(hideTimeout);
                            hideTimeout = null;
                        }
                        expandedText.style.backgroundColor = '#f3f4f6';
                    };
                    expandedText.onmouseleave = function() {
                        expandedText.style.maxHeight = '0';
                        expandedText.style.opacity = '0';
                        setTimeout(() => {
                            expandedText.style.display = 'none';
                            textDisplay.style.display = 'block';
                        }, 300);
                    };
                }
            });
        }
    }

    // 按钮悬停效果
    toggleButton.onmouseenter = function() {
        toggleButton.style.backgroundColor = '#e5e7eb';
        toggleButton.style.borderColor = '#9ca3af';
        previewContainer.style.display = 'block';
        // 同步预览窗口内容
        syncPreviewContent();
    };

    toggleButton.onmouseleave = function() {
        toggleButton.style.backgroundColor = '#f3f4f6';
        toggleButton.style.borderColor = '#d1d5db';
        previewContainer.style.display = 'none';
    };

    // 预览窗口悬停处理（防止鼠标移动到预览窗口时关闭）
    previewContainer.onmouseenter = function() {
        previewContainer.style.display = 'block';
        syncPreviewContent(); // 确保内容是最新的
    };

    previewContainer.onmouseleave = function() {
        previewContainer.style.display = 'none';
    };

    document.body.appendChild(toggleButton);
    document.body.appendChild(tocContainer);
    document.body.appendChild(previewContainer);

    // 切换显示/隐藏
    toggleButton.onclick = function(e) {
        e.stopPropagation(); // 阻止事件冒泡
        if (tocContainer.style.display === 'block') {
            tocContainer.style.display = 'none';
            toggleButton.innerHTML = '▶';
            // 确保预览窗口也被隐藏
            previewContainer.style.display = 'none';
        } else {
            tocContainer.style.display = 'block';
            toggleButton.innerHTML = '━';
        }
    };

    let isUpdating = false; // 防止重复更新导致卡死
    let observer = null; // 先声明 observer 变量

    function updateTOC() {
        if (isUpdating) return; // 如果正在更新，直接返回
        
        const messages = document.querySelectorAll('div[data-message-author-role="user"]');
        
        // 检查是否需要更新（通过比较消息数量）
        const currentItemCount = tocContainer.querySelectorAll('.toc-item').length;
        if (messages.length === currentItemCount) {
            return; // 跳过更新如果消息数量没有变化
        }

        isUpdating = true; // 标记正在更新
        
        // 临时断开 observer 以避免无限循环
        if (observer) {
            observer.disconnect();
        }
        
        tocContainer.innerHTML = ''; // 清空之前的内容

        messages.forEach((message, index) => {
            const lastDiv = message.querySelector('div:last-child div:last-child');
            if (!lastDiv) return; // 如果没有找到 div 则跳过

            const questionId = `question-${index}`;
            lastDiv.id = questionId;

            let questionText = lastDiv.textContent.trim() || `......`;
            const fullText = questionText;
            const shortText = questionText.length > 9 ? `${questionText.substring(0, 8)}...` : questionText;
            let formattedIndex = ("0" + (index + 1)).slice(-2);  // 两位数字编号

            // 创建 TOC 项容器
            const tocItem = document.createElement('div');
            tocItem.className = 'toc-item';
            
            // 创建显示文本的元素
            const textDisplay = document.createElement('div');
            textDisplay.className = 'toc-item-text';
            textDisplay.textContent = `${formattedIndex} ${shortText}`;
            
            Object.assign(textDisplay.style, {
                cursor: 'pointer',
                marginBottom: '5px',
                padding: '6px 8px',
                borderRadius: '6px',
                transition: 'background-color 0.2s ease, max-height 0.3s ease',
                color: '#1f2937',
                backgroundColor: 'transparent',
                maxHeight: '2.25em', // 增大50%：从1.5em增加到2.25em
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                lineHeight: '1.5em',
                minHeight: '2.25em' // 确保最小高度
            });

            // 创建展开文本容器（用于悬停时显示）
            const expandedText = document.createElement('div');
            expandedText.className = 'toc-item-expanded';
            expandedText.textContent = `${formattedIndex} ${fullText}`;
            
            Object.assign(expandedText.style, {
                cursor: 'pointer',
                marginBottom: '5px',
                padding: '6px 8px',
                borderRadius: '6px',
                transition: 'max-height 0.3s ease, opacity 0.2s ease',
                color: '#1f2937',
                backgroundColor: '#f9fafb',
                maxHeight: '0',
                overflow: 'hidden',
                opacity: '0',
                display: 'none',
                lineHeight: '1.5em',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            });

            // 点击跳转功能
            const scrollToQuestion = function() {
                document.getElementById(questionId).scrollIntoView({ behavior: 'smooth' });
            };

            textDisplay.onclick = scrollToQuestion;
            expandedText.onclick = scrollToQuestion;

            // 悬停时展开显示更多文本（约10行）
            let hideTimeout = null;
            
            textDisplay.onmouseenter = function() {
                // 清除任何待处理的隐藏操作
                if (hideTimeout) {
                    clearTimeout(hideTimeout);
                    hideTimeout = null;
                }
                // 隐藏短文本，显示展开文本
                textDisplay.style.display = 'none';
                expandedText.style.display = 'block';
                // 使用 requestAnimationFrame 确保样式已应用
                requestAnimationFrame(() => {
                    expandedText.style.maxHeight = '15em'; // 约10行高度
                    expandedText.style.opacity = '1';
                    expandedText.style.backgroundColor = '#f3f4f6';
                });
            };

            textDisplay.onmouseleave = function() {
                // 延迟隐藏，允许鼠标移动到展开区域
                hideTimeout = setTimeout(() => {
                    if (!expandedText.matches(':hover')) {
                        expandedText.style.maxHeight = '0';
                        expandedText.style.opacity = '0';
                        setTimeout(() => {
                            expandedText.style.display = 'none';
                            textDisplay.style.display = 'block';
                        }, 300);
                    }
                }, 150);
            };

            expandedText.onmouseenter = function() {
                // 清除任何待处理的隐藏操作
                if (hideTimeout) {
                    clearTimeout(hideTimeout);
                    hideTimeout = null;
                }
                expandedText.style.backgroundColor = '#f3f4f6';
            };

            expandedText.onmouseleave = function() {
                expandedText.style.maxHeight = '0';
                expandedText.style.opacity = '0';
                setTimeout(() => {
                    expandedText.style.display = 'none';
                    textDisplay.style.display = 'block';
                }, 300);
            };

            tocItem.appendChild(textDisplay);
            tocItem.appendChild(expandedText);
            tocContainer.appendChild(tocItem);
        });
        
        // 重新连接 observer
        if (observer) {
            observer.observe(document.body, { childList: true, subtree: true });
        }
        isUpdating = false; // 标记更新完成
    }

    // 使用 MutationObserver 监听 DOM 变化
    observer = new MutationObserver(mutations => {
        if (isUpdating) return; // 如果正在更新，忽略新的 mutation
        
        let shouldUpdate = false;
        mutations.forEach(mutation => {
            // 忽略我们自己创建的元素的变更
            if (mutation.target && (
                mutation.target.id === 'tocContainer' ||
                mutation.target.id === 'previewContainer' ||
                mutation.target.id === 'tocToggleButton' ||
                mutation.target.closest('#tocContainer') ||
                mutation.target.closest('#previewContainer')
            )) {
                return; // 跳过我们自己创建的元素的变化
            }
            if (mutation.addedNodes.length) {
                // 检查是否真的是用户消息节点
                for (let node of mutation.addedNodes) {
                    if (node.nodeType === 1 && (
                        node.querySelector && node.querySelector('div[data-message-author-role="user"]') ||
                        node.getAttribute && node.getAttribute('data-message-author-role') === 'user'
                    )) {
                        shouldUpdate = true;
                        break;
                    }
                }
            }
        });
        if (shouldUpdate) {
            updateTOC();
            // 如果预览窗口正在显示，同步更新其内容
            if (previewContainer.style.display === 'block') {
                syncPreviewContent();
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    updateTOC();  // 初始更新
})();

