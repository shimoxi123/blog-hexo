#!/bin/bash

echo "Fixing submodule configuration for EdgeOne-Pages branch..."

# 切换到 EdgeOne-Pages 分支
git checkout EdgeOne-Pages

# 复制正确的 .gitmodules 配置
cp deploy/.gitmodules .gitmodules

echo "Updated .gitmodules content:"
cat .gitmodules

# 同步子模块配置
git submodule sync --recursive

# 配置子模块跟踪分支
git config -f .gitmodules submodule.themes/volantis.branch EdgeOne-Pages
git submodule set-branch --branch EdgeOne-Pages themes/volantis

# 更新子模块到最新的分支
git submodule update --remote --recursive

# 进入子模块确认状态
cd themes/volantis
echo "Submodule current branch: $(git branch --show-current)"
echo "Submodule current commit: $(git rev-parse HEAD)"
cd ..

# 提交变更
git add .gitmodules themes/volantis
git commit -m "Fix submodule to track EdgeOne-Pages branch instead of specific commit"

echo "✅ Submodule configuration fixed!"
echo "Now the submodule should track the EdgeOne-Pages branch instead of a specific commit."