<template>
    <div class="list-container">
        <n-list hoverable clickable>
      <n-list-item>
        <n-thing title="标题" content-style="margin-top: 10px;">
          <template #description>
            <n-space size="small" style="margin-top: 4px">
              <n-tag :bordered="false" type="info" size="small">
                代取
              </n-tag>
              <n-tag :bordered="false" type="info" size="small">
                代取
              </n-tag>
            </n-space>
          </template>
          这里是一段描述<br>
          这里也是一段描述
        </n-thing>
      </n-list-item>
      <n-list-item>
        <n-thing title="标题二" content-style="margin-top: 10px;">
          <template #description>
            <n-space size="small" style="margin-top: 4px">
              <n-tag :bordered="false" type="info" size="small">
                跑腿
              </n-tag>
              <n-tag :bordered="false" type="info" size="small">
                跑腿
              </n-tag>
            </n-space>
          </template>
          这里是一段描述<br>
          这里是一段描述<br>
          这里是一段描述<br>
          这里是一段描述
        </n-thing>
      </n-list-item>
      <n-list-item>
        <n-thing title="标题三" content-style="margin-top: 10px;">
          <template #description>
            <n-space size="small" style="margin-top: 4px">
              <n-tag :bordered="false" type="info" size="small">
                求助
              </n-tag>
              <n-tag :bordered="false" type="info" size="small">
                求助
              </n-tag>
            </n-space>
          </template>
          这里是一段很长很长很长很长很长很长很长很长很长很长很长很长
          很长很长很长很长很长很长很长很长很长很长很
          长很长很长很长很长很长很长很长很长很长很长很长
          很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的描述
        </n-thing>
      </n-list-item>
    </n-list>
    </div>
</template>

<style scoped>
.list-container {
  padding: 50px 650px;
}
</style>