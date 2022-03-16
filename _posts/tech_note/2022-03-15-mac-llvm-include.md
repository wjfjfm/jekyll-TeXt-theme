---
category: 技术随笔
title: Mac更新CommandLineTools
---

通过 `brew install llvm@12` 安装llvm12后，Include搜索路径指向MacOSX11.sdk，但当前只有MacOSX10.sdk, 表现如下：

原生llvm11/clang的include搜索路径：

```
$ echo | clang++ -E -Wp,-v -
clang -cc1 version 11.0.3 (clang-1103.0.32.62) default target x86_64-apple-darwin20.3.0
ignoring nonexistent directory "/Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/usr/local/include"
ignoring nonexistent directory "/Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/Library/Frameworks"
#include "..." search starts here:
#include <...> search starts here:
 /usr/local/include
 /Library/Developer/CommandLineTools/usr/lib/clang/11.0.3/include
 /Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/usr/include
 /Library/Developer/CommandLineTools/usr/include
 /Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/System/Library/Frameworks (framework directory)
End of search list.
...

```

新安装的llvm12/clang的include搜索路径:

```
$ echo | /usr/local/Cellar/llvm@12/12.0.1_1/bin/clang++ -E -Wp,-v -
clang -cc1 version 12.0.1 based upon LLVM 12.0.1 default target x86_64-apple-darwin20.3.0
ignoring nonexistent directory "/Library/Developer/CommandLineTools/SDKs/MacOSX11.sdk/usr/local/include"
ignoring nonexistent directory "/Library/Developer/CommandLineTools/SDKs/MacOSX11.sdk/usr/include"
ignoring nonexistent directory "/Library/Developer/CommandLineTools/SDKs/MacOSX11.sdk/System/Library/Frameworks"
ignoring nonexistent directory "/Library/Developer/CommandLineTools/SDKs/MacOSX11.sdk/Library/Frameworks"
#include "..." search starts here:
#include <...> search starts here:
 /usr/local/Cellar/llvm@12/12.0.1_1/lib/clang/12.0.1/include
End of search list.
...
```

安装最新CommandLineTools的方法：

```
# 删除已有CommandLineTools
$sudo rm -rf /Library/Developer/CommandLineTools

# 重新安装
$xcode-select --install
```

总共大概1-2GB大小

安装完毕后，检查llvm12/clang的include搜索路径就正常了:

```
$ echo | /usr/local/Cellar/llvm@12/12.0.1_1/bin/clang++ -E -Wp,-v -
clang -cc1 version 12.0.1 based upon LLVM 12.0.1 default target x86_64-apple-darwin20.3.0
ignoring nonexistent directory "/Library/Developer/CommandLineTools/SDKs/MacOSX11.sdk/usr/local/include"
ignoring nonexistent directory "/Library/Developer/CommandLineTools/SDKs/MacOSX11.sdk/Library/Frameworks"
#include "..." search starts here:
#include <...> search starts here:
 /usr/local/Cellar/llvm@12/12.0.1_1/lib/clang/12.0.1/include
 /Library/Developer/CommandLineTools/SDKs/MacOSX11.sdk/usr/include
 /Library/Developer/CommandLineTools/SDKs/MacOSX11.sdk/System/Library/Frameworks (framework directory)
End of search list.
...
```
