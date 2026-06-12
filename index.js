(async () => {
  // === 【长间隔自定义配置 / Configuration】 ===
  const totalClicks = 30;       // 计划自动点击的总次数 / Total cycles to run
  const blindWaitTime = 50000;  // 点击后“闭眼默数”的时间：50秒 / Initial sleep time after click: 50s
  const checkInterval = 10000;  // 50秒后，每隔 10秒 检查一次状态 / Status check frequency: 10s
  // ============================================

  console.log("☕ X Copilot 佛系长间隔连点器已启动！ / X Copilot Auto-Clicker Started!");
  
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const getRandomHumanPause = () => Math.floor(Math.random() * 5000) + 5000; 

  for (let i = 1; i <= totalClicks; i++) {
    // 1. 寻找按钮 / Find Button
    let syncButton = Array.from(document.querySelectorAll('button')).find(el => 
      el.textContent.includes('同步喜欢') || el.textContent.includes('停止同步')
    );

    if (!syncButton) {
      console.log(`❌ 未找到目标按钮，请确保同步面板处于打开状态。 / Target button not found. Please ensure the sync panel is open.`);
      break;
    }

    // 2. 如果当前是空闲状态，发起点击 / If idle, trigger click
    if (syncButton.textContent.includes('同步喜欢')) {
      console.log(`[第 ${i}/${totalClicks} 次] 🤖 动作：点击“同步喜欢” / [Cycle ${i}/${totalClicks}] 🤖 Action: Clicking "同步喜欢"`);
      syncButton.click();
      
      // 3. 点击后进入“盲等阶段” / Initial blind wait
      console.log(`⏳ 预计同步需要一分钟。脚本将直接静默等待 ${blindWaitTime / 1000} 秒... / ⏳ Sync usually takes ~1 min. Script will sleep for ${blindWaitTime / 1000}s...`);
      await sleep(blindWaitTime);
    }

    // 4. 盲等结束，开始低频探测按钮状态 / Start detecting status
    syncButton = Array.from(document.querySelectorAll('button')).find(el => 
      el.textContent.includes('同步喜欢') || el.textContent.includes('停止同步')
    );

    if (syncButton && syncButton.textContent.includes('停止同步')) {
      console.log(`👀 50秒过去，插件仍在努力同步中。进入低频监测... / 👀 50s passed, still syncing. Entering low-frequency tracking...`);
      while (syncButton && syncButton.textContent.includes('停止同步')) {
        console.log(`⏱️ 10秒后再次查看状态... / ⏱️ Re-checking in 10 seconds...`);
        await sleep(checkInterval);
        
        syncButton = Array.from(document.querySelectorAll('button')).find(el => 
          el.textContent.includes('同步喜欢') || el.textContent.includes('停止同步')
        );
      }
    }

    console.log(`🎉 本批次同步已彻底完成！ / 🎉 Current batch completed successfully!`);

    // 5. 触发长时大歇保护 / Anti-bot cool down
    if (i % 5 === 0 && i !== totalClicks) {
      const restTime = 60000 + Math.floor(Math.random() * 30000); 
      console.log(`☕ 已安全完成 5 个大批次。触发防封保护，大歇 ${Math.round(restTime/1000)} 秒... / ☕ 5 cycles finished. Anti-ban active, taking a big break for ${Math.round(restTime/1000)}s...`);
      await sleep(restTime);
      continue;
    }

    // 6. 普通批次之间的人类模拟停顿 / Micro human pause
    const finalPause = getRandomHumanPause();
    console.log(`🧘 模拟人类阅读延迟，等待 ${Math.round(finalPause/1000)} 秒... / 🧘 Simulating human reading, waiting for ${Math.round(finalPause/1000)}s...`);
    await sleep(finalPause);
  }

  console.log("🎉 所有同步任务已安全执行完毕！ / 🎉 All preset automation cycles finished successfully!");
})();
