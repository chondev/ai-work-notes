# 사용 환경과 설치 안내

## 처음이라면 브라우저로 시작하세요

메일·회의록·공지 초안을 쓸 때는 기존 웹 브라우저에서 회사가 허용한 AI 서비스에 로그인하면 됩니다. 프롬프트의 ‘복사’ 버튼을 누른 뒤 새 대화에 붙여 넣고, 대괄호를 실제 대상·기한·자료로 바꿔 전송하세요.

이미 받은 엑셀·PPT·워드 파일을 읽고 편집하는 경우에도 Google Drive에 업로드한 뒤 해당 웹 편집기로 열 수 있습니다. 회사 지정 Office 양식의 수식, 글꼴, 인쇄 배치가 중요하면 최종 제출에 사용할 프로그램에서도 확인하세요.

[Google 공식 도움말 · Office 파일 열기와 편집](https://support.google.com/docs/answer/9406611?hl=ko)

## 내 계정에서 파일 생성이 되는지 확인하기

ChatGPT를 예로 들면 파일 첨부·데이터 분석 기능은 계정과 업무 공간 설정 등에 따라 달라집니다. 분석용 파이썬이 서비스 안에서 실행되는 경우에는 PC에 파이썬을 설치할 필요가 없습니다. 처음에는 아래 가상 자료로 시험하세요.

```prompt
배송비 3,000원과 포장비 2,000원을 항목별로 담은 엑셀 파일(.xlsx)을 만들어줘. 마지막 행에는 두 금액을 합산하는 엑셀 수식을 넣고, 완성한 파일을 내려받을 수 있게 제공해줘.
```

답변에 첨부된 파일을 열어 합계가 5,000원인지 확인하세요. 배송비를 4,000원으로 바꿨을 때 합계가 6,000원이 되면 수식까지 작동합니다. 텍스트 표만 나오면 ‘편집 가능한 .xlsx 파일로 첨부해줘’라고 요청하세요. 계속 파일이 없으면 현재 대화의 파일 생성 기능과 회사 계정 설정을 확인하세요.

[OpenAI 공식 도움말 · 파일 업로드와 데이터 분석](https://help.openai.com/en/articles/8437071)

## 회사 PC에 Excel·PowerPoint·Word가 필요할 때

먼저 시작 메뉴(Windows)나 응용 프로그램(macOS)에서 사용할 앱을 찾아보세요. 이미 설치되어 있으면 앱을 열고 라이선스가 있는 계정으로 로그인하면 됩니다.

새로 설치하려면 아래 Microsoft 공식 안내에서 Microsoft 365 앱 페이지로 이동하세요. 데스크톱 앱 라이선스가 있는 계정으로 로그인한 뒤 ‘앱 설치’에서 설치 파일을 받아 실행하세요. 설치가 끝나면 앱을 열고 같은 계정으로 로그인한 뒤 예시 파일을 열어보세요. 회사 계정에 설치 메뉴가 보이지 않으면 사내 소프트웨어 배포 경로나 라이선스 배정을 확인하세요.

[Microsoft 공식 안내 · Windows와 Mac용 Office 설치](https://support.microsoft.com/ko-kr/office/lifecycle/officeinstall/download-install-or-reinstall-microsoft-365-or-office-2024-on-a-pc-or-mac)

## 선택 사항 · 받은 파이썬 코드를 내 PC에서 다시 실행할 때

매달 같은 파일을 가공하려고 .py 스크립트까지 받은 경우에 해당합니다. Python 3을 공식 사이트에서 설치하고, 스크립트와 입력 파일을 한 폴더에 두세요. 그 폴더에서 아래 명령을 한 줄씩 실행하세요. 예시는 엑셀 작업용이며 실제 스크립트 파일명에 맞춰 report.py를 바꾸세요.

[Python 공식 다운로드](https://www.python.org/downloads/)

## Windows · PowerShell

```powershell
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install pandas openpyxl
.\.venv\Scripts\python.exe report.py
```

## macOS · 터미널

```sh
python3 -m venv .venv
./.venv/bin/python -m pip install pandas openpyxl
./.venv/bin/python report.py
```

PPT 제작 코드는 python-pptx, 워드 제작 코드는 python-docx를 사용하기도 합니다. 스크립트에 requirements.txt가 함께 들어 있다면 위 설치 명령의 ‘pandas openpyxl’을 ‘-r requirements.txt’로 바꾸세요. 실행이 끝나면 스크립트에서 지정한 출력 폴더에 결과 파일이 생겼는지 확인하세요.

[Python 패키징 가이드 · 가상환경에 패키지 설치](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/)
