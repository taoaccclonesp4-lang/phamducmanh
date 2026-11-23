/* Bộ hiển thị nội dung tự biên soạn; không phải nội dung chính thức VNU */
(function(){
const e=(tag,cls,txt)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(txt!==undefined)el.textContent=txt;return el};
const getChapter=()=>{const g=groups.find(([_,items])=>items.includes(selected));if(!g)return 2;const i=groups.indexOf(g);return ({1:1,2:2,3:3,4:4,5:5,7:6,8:7})[i]||2};
const clear=n=>{while(n.firstChild)n.removeChild(n.firstChild)};
function section(container,title,content){container.append(e('h2',null,title),e('p',null,content))}
function ordered(container,items){const ul=e('ol');items.forEach(t=>ul.append(e('li',null,t)));container.append(ul)}
function isQuiz(s){return /trắc nghiệm|kiểm tra giữa kỳ|bài tập|đánh giá cuối kỳ/i.test(s)}
function isPractice(s){return /thực hành/i.test(s)}
function isInfo(s){return /thông tin bài học|thông tin về bài học|thông tin học phần|thông tin đánh giá/i.test(s)}
function renderQuiz(root,lesson){root.append(e('h2',null,'Câu hỏi tự kiểm tra'));root.append(e('p',null,'Chọn một đáp án cho mỗi câu. Kết quả được tính ngay trên trình duyệt và không gửi lên máy chủ.'));const form=e('div');lesson.quiz.forEach(([q,opts],idx)=>{const item=e('fieldset','q');item.style.border='0';const legend=e('legend');legend.textContent=`Câu ${idx+1}. ${q}`;legend.style.fontWeight='600';item.append(legend);opts.forEach((o,j)=>{const label=e('label','answer'),input=e('input');input.type='radio';input.name='quiz'+idx;input.value=j;label.append(input,document.createTextNode(' '+String.fromCharCode(65+j)+'. '+o));item.append(label)});form.append(item)});const feedback=e('div','feedback');const submit=e('button',null,'Kiểm tra đáp án');submit.onclick=()=>{let score=0;lesson.quiz.forEach(([, ,correct],idx)=>{const answer=form.querySelector(`input[name="quiz${idx}"]:checked`);if(answer&&Number(answer.value)===correct)score++});feedback.textContent=`Bạn trả lời đúng ${score}/${lesson.quiz.length} câu. Đáp án: `+lesson.quiz.map(([, ,n],idx)=>`${idx+1}${String.fromCharCode(65+n)}`).join(' · ')};root.append(form,submit,feedback)}
function renderLesson(){window.lecturePageChange=null;const article=$('lessonArticle'),l=window.LESSONS[getChapter()]||LESSONS[2];clear(article);article.classList.remove('long-lecture');$('pageHolder').onscroll=null;$('pageHolder').style.display='';$('pdfFrame').hidden=true;$('placeholderPage').hidden=true;article.hidden=false;$('thumbs').hidden=true;$('pageTotal').textContent='Nội dung bài';$('pageNumber').value=1;
article.append(e('p','eyebrow','BÀI HỌC BIÊN SOẠN BỔ SUNG · KHÔNG PHẢI GIÁO TRÌNH CHÍNH THỨC'),e('h1',null,selected));const note=e('div','info-box',l.intro);article.append(note);
if(/DANH SÁCH SINH VIÊN/i.test(selected)){article.append(e('h2',null,'Danh sách lớp'));article.append(e('p',null,'Danh sách này được quản lý riêng cho website mô phỏng. Mở tab Thành viên để thêm tên.'));return}
if(/NHỮNG THÔNG TIN ĐẶC BIỆT/i.test(selected)){section(article,'Hướng dẫn sử dụng','Tất cả bài đọc và bài tập trên trang này được biên soạn độc lập để luyện tập. Không thay thế tài liệu hoặc thông báo của giảng viên chính thức.');ordered(article,['Đọc mục tiêu trước khi học.','Học phần nội dung, ghi lại khái niệm chính.','Thực hiện nhiệm vụ thực hành.','Làm trắc nghiệm và kiểm tra các câu sai.']);return}
if(/Đề cương ôn tập/i.test(selected)){article.append(e('h2',null,'Nội dung ôn tập giữa kỳ'));ordered(article,[...Array.from({length:5},(_,i)=>`Bài ${i+1}: ${LESSONS[i+1].title} — khái niệm trọng tâm, ví dụ và thao tác thực hành.`),'Ôn lại câu hỏi trắc nghiệm của từng bài, thử vận dụng vào tình huống mới.']);return}
if(/kiểm tra giữa kỳ|đánh giá cuối kỳ/i.test(selected)){article.append(e('p',null,'Đây là đề ôn tập mẫu không liên quan điểm số trên LMS gốc.'));renderQuiz(article,l);return}
if(isInfo(selected)){section(article,'Mục tiêu học tập','Sau khi hoàn thành bài, người học có thể:');ordered(article,l.objectives);section(article,'Cách học gợi ý','Đọc bài, ghi lại ba ý chính, hoàn thành hoạt động thực hành và sử dụng câu hỏi tự kiểm tra để đánh giá mức độ hiểu bài.');return}
if(/video/i.test(selected)){section(article,'Nội dung thay thế dạng bài đọc','Không có tệp video gốc được cung cấp. Phần sau là nội dung tóm lược độc lập cho chủ đề tương ứng, không phải bản chép lời video.');let n=/Video (\d+)/.exec(selected);const map={1:'Mục tiêu học tập và nội dung chính',2:'Khái niệm và ví dụ ứng dụng của AI',3:'Năng lực số trong học tập',4:'Cấu trúc prompt',5:'Cải tiến prompt theo vòng lặp',6:'Sử dụng AI có trách nhiệm'};section(article,map[n?.[1]]||'Khái quát AI',l.sections[Math.min(Math.max(Number(n?.[1]||1)-1,0),l.sections.length-1)][1]);article.append(e('p','small-note','Video gốc chưa được tích hợp.'));return}
if(isPractice(selected)){article.append(e('h2',null,'Nhiệm vụ thực hành'));ordered(article,l.practice);section(article,'Tiêu chí tự đánh giá','Bài làm cần đúng yêu cầu, có kết quả đầu ra rõ ràng, giải thích được lựa chọn và ghi nhận tài liệu sử dụng khi cần.');return}
if(isQuiz(selected)){renderQuiz(article,l);return}
if(/mở rộng/i.test(selected)){section(article,'Học liệu mở rộng tự học','Tìm kiếm các tài liệu nhập môn phù hợp với từ khóa của bài học. Ưu tiên trang học thuật, tài liệu chính thức của cơ quan giáo dục và nguồn có tác giả, năm xuất bản rõ ràng.');ordered(article,['So sánh ít nhất hai nguồn cùng chủ đề.','Viết tóm tắt 150 từ theo cách hiểu của mình.','Ghi lại đầy đủ thông tin nguồn và kiểm tra đường dẫn.']);return}
if(window.LECTURE_PAGES?.[getChapter()] && /bài giảng/i.test(selected)){
  const pages=window.LECTURE_PAGES[getChapter()];
  clear(article);
  article.classList.add('long-lecture');
  article.append(e('p','eyebrow',`HỌC LIỆU TỰ BIÊN SOẠN · BÀI ${getChapter()===7?'7B':getChapter()} · 10 TRANG LIÊN TỤC`));
  article.append(e('h1',null,l.title));
  article.append(e('p','small-note','Cuộn xuống để đọc toàn bộ 10 trang. Có thể dùng ô số trang để nhảy nhanh tới phần tương ứng.'));
  const sheets=[];
  pages.forEach((data,i)=>{
    const sheet=e('section','lecture-sheet');
    sheet.id=`lecture-sheet-${i+1}`;
    sheet.append(e('p','eyebrow',`TRANG ${i+1} / ${pages.length} · ${data.kind}`));
    sheet.append(e('h2',null,`${i+1}. ${data.title}`));
    sheet.append(e('p',null,data.main));
    sheet.append(e('h3',null,'Giải thích và minh họa'));
    sheet.append(e('p',null,data.example));
    sheet.append(e('h3',null,'Các bước tiếp cận'));
    ordered(sheet,data.steps);
    sheet.append(e('h3',null,'Thực hành ngắn'));
    sheet.append(e('p','lecture-practice',data.practice));
    sheet.append(e('h3',null,'Câu hỏi suy ngẫm'));
    sheet.append(e('p',null,data.reflection));
    sheet.append(e('p','sheet-footer',`Học liệu tự biên soạn · ${i+1} / ${pages.length}`));
    article.append(sheet);sheets.push(sheet);
  });
  $('pageTotal').textContent=`/ ${pages.length}`;
  const holder=$('pageHolder');
  const go=n=>{
    const i=Math.max(0,Math.min(sheets.length-1,(Number(n)||1)-1));
    holder.scrollTo({top:sheets[i].getBoundingClientRect().top-holder.getBoundingClientRect().top+holder.scrollTop-14,behavior:'smooth'});
    $('pageNumber').value=i+1;
    return true;
  };
  window.lecturePageChange=go;
  const onScroll=()=>{
    if(!article.isConnected || !article.classList.contains('long-lecture'))return;
    const anchor=holder.getBoundingClientRect().top+100;
    let idx=0;
    sheets.forEach((el,i)=>{if(el.getBoundingClientRect().top<=anchor)idx=i});
    $('pageNumber').value=idx+1;
    page=idx+1;
  };
  holder.onscroll=onScroll;
  holder.scrollTop=0;
  $('pageNumber').value=1;
  page=1;
  return;
}

article.append(e('h2',null,'Nội dung bài giảng'));l.sections.forEach(([title,body])=>section(article,title,body));article.append(e('h2',null,'Ghi nhớ cuối bài'));ordered(article,l.objectives);article.append(e('h2',null,'Vận dụng'));ordered(article,l.practice);article.append(e('p','small-note','Tài liệu học tập tham khảo được biên soạn riêng cho bản LMS mô phỏng. Không phải bài giảng do VNU phát hành.'));
}
window.renderLesson=renderLesson;
window.renderProfileTab=function(key,container){clear(container);const a=e('article');if(key==='teacher'){a.append(e('h2',null,'Giảng viên'));const card=e('div','person');card.style.maxWidth='340px';card.append(e('div','avatar','PM'),e('h3',null,'Phạm Đức Mạnh'),e('small',null,'Giảng viên (thông tin thiết lập cho bản mô phỏng)'));a.append(card);container.append(a);return true}
if(key==='docs'){a.append(e('h2',null,'Tài liệu Bookworm'));a.append(e('p',null,'Liên kết Facebook do người tạo bản mô phỏng cung cấp.'));const link=e('a','external-link','Mở Facebook cá nhân · facebook.com/19th2.07 ↗');link.href='https://www.facebook.com/19th2.07';link.target='_blank';link.rel='noopener noreferrer';a.append(link);container.append(a);return true}
if(key==='schedule'){
 a.append(e('h2',null,'Lịch tuần từ thứ Hai đến Chủ nhật'));a.append(e('p',null,'Lịch vui được sắp xếp mẫu, không phải thời khóa biểu chính thức. Bạn có thể chỉnh sửa trực tiếp từng ô và lưu trên trình duyệt.'));
 const days=['Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm','Thứ Sáu','Thứ Bảy','Chủ nhật'];
 const defaults=[['07:30–11:30 | Học trên lớp','14:00–16:00 | Học online','23:00–07:00 | Đi ngủ'],['08:00–10:00 | Học online','15:00–17:00 | Chơi game','23:30–07:30 | Đi ngủ'],['07:30–11:30 | Học trên lớp','19:00–21:00 | Đi date','23:00–07:00 | Đi ngủ'],['09:00–11:00 | Học online','14:00–17:00 | Học trên lớp','22:30–07:00 | Đi ngủ'],['08:00–11:00 | Học trên lớp','20:00–22:00 | Chơi game','23:30–08:00 | Đi ngủ'],['09:00–11:00 | Học online','16:00–18:00 | Đi date','00:00–09:00 | Đi ngủ'],['09:00–11:00 | Chơi game','15:00–17:00 | Đi date','22:30–07:30 | Đi ngủ']];
 let schedule=defaults;try{const v=JSON.parse(localStorage.getItem('lms_demo_schedule_v1'));if(Array.isArray(v)&&v.length===7)schedule=v}catch(_){}
 const table=e('table','weekly-table');const header=e('tr');['Ngày','Hoạt động 1','Hoạt động 2','Hoạt động 3'].forEach(t=>header.append(e('th',null,t)));table.append(header);const fields=[];days.forEach((day,i)=>{const tr=e('tr');tr.append(e('th',null,day));fields[i]=[];schedule[i].forEach((activity,j)=>{const td=e('td'),inp=e('textarea','schedule-cell');inp.value=activity;inp.setAttribute('aria-label',day+' hoạt động '+(j+1));td.append(inp);tr.append(td);fields[i].push(inp)});table.append(tr)});a.append(table);const save=e('button','member-save','Lưu lịch học');save.onclick=()=>{localStorage.setItem('lms_demo_schedule_v1',JSON.stringify(fields.map(row=>row.map(x=>x.value))));msg.textContent='Đã lưu lịch trên trình duyệt này.'};const reset=e('button','button-secondary','Khôi phục lịch mẫu');reset.onclick=()=>{fields.forEach((row,i)=>row.forEach((inp,j)=>inp.value=defaults[i][j]));localStorage.removeItem('lms_demo_schedule_v1');msg.textContent='Đã khôi phục lịch mẫu.'};const msg=e('p','small-note');a.append(save,reset,msg);container.append(a);return true;
}
if(key==='comment'){
 a.append(e('h2',null,'Nhận xét vui về giảng viên'));a.append(e('p',null,'Góc bình chọn giải trí của bản mô phỏng, không phải đánh giá chính thức hoặc xác nhận mối quan hệ cá nhân.'));
 const questions=[['handsome','Giảng viên Phạm Đức Mạnh có đẹp trai không?',['Có, rất đẹp trai 😎','Đẹp trai theo một cách rất riêng ✨','Để suy nghĩ thêm 🤔']],['couple','Phạm Đức Mạnh và Khánh có đẹp đôi không?',['Có, trông hợp đôi 💚','Có nét dễ thương 😊','Để hai người tự quyết 💬']]];
 questions.forEach(([id,title,choices])=>{const block=e('section','vote-card');block.append(e('h3',null,title));const choicesDiv=e('div','vote-options'),result=e('p','vote-feedback');let saved='';try{saved=localStorage.getItem('lms_demo_vote_'+id)||''}catch(_){}choices.forEach((choice,i)=>{const b=e('button','vote-option'+(String(i)===saved?' chosen':''),choice);b.onclick=()=>{localStorage.setItem('lms_demo_vote_'+id,String(i));choicesDiv.querySelectorAll('button').forEach((n,k)=>n.classList.toggle('chosen',k===i));result.textContent='Bạn chọn: '+choice+' · Đã lưu trên trình duyệt này.'};choicesDiv.append(b)});if(saved!=='')result.textContent='Lựa chọn đã lưu: '+(choices[Number(saved)]||'');block.append(choicesDiv,result);a.append(block)});container.append(a);return true;
}
if(key==='members'){a.append(e('h2',null,'Thành viên lớp học'));a.append(e('p',null,'Danh sách thành viên do người sử dụng nhập cho bản mô phỏng; không đồng bộ từ LMS gốc.'));let members=['Phạm Thị Ngọc Khánh','Hoàng Thị Mến','Bùi Ngọc Linh','Phạm Thị Thanh Ngân','Ngô Thị Ngọc','Phạm Ngọc Sơn'];try{const saved=localStorage.getItem('lms_demo_members_v2');if(saved)members=JSON.parse(saved)}catch(_){}const studentIds={'Phạm Thị Ngọc Khánh':'25031477','Hoàng Thị Mến':'25031498','Bùi Ngọc Linh':'25031487','Phạm Thị Thanh Ngân':'25031502','Ngô Thị Ngọc':'25031504','Phạm Ngọc Sơn':'25031520'};const grid=e('div','member-grid');const show=()=>{clear(grid);if(!members.length)grid.append(e('p',null,'Chưa nhập danh sách thành viên.'));members.forEach(name=>{const card=e('div','person');card.append(e('div','avatar',name.split(/\s+/).slice(-2).map(x=>x[0]||'').join('').toUpperCase()),e('h3',null,name),e('small',null,studentIds[name]?'Mã sinh viên: '+studentIds[name]:'Thành viên'));grid.append(card)})};show();a.append(grid,e('h2',null,'Chỉnh sửa danh sách'));const t=e('textarea','member-editor');t.placeholder='Mỗi dòng một thành viên (không bao gồm Phạm Đức Mạnh)';t.value=members.join('\n');const save=e('button','member-save','Lưu danh sách');save.onclick=()=>{members=[...new Set(t.value.split('\n').map(x=>x.trim()).filter(x=>x&&x.toLocaleLowerCase()!=='phạm đức mạnh'))];localStorage.setItem('lms_demo_members_v2',JSON.stringify(members));show()};a.append(t,save);container.append(a);return true}return false};
})();
