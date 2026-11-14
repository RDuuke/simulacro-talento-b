const sqlSeed = `CREATE TABLE empleados (id INTEGER, nombre TEXT, departamento TEXT, salario INTEGER, activo INTEGER);
INSERT INTO empleados VALUES (1,'Ana','Ventas',3000,1),(2,'Luis','IT',4500,1),(3,'Marta','Ventas',4000,0),(4,'Pedro','IT',5000,1),(5,'Sara','RRHH',3500,1),(6,'Elena','Ventas',NULL,1);
CREATE TABLE departamentos (nombre TEXT, ciudad TEXT);
INSERT INTO departamentos VALUES ('Ventas','Bogotá'),('IT','Medellín'),('RRHH','Cali'),('Legal','Bogotá');`;
const sqlRows = [
['facil','Muestra los nombres de todos los empleados.','SELECT nombre FROM empleados'],
['facil','Muestra los nombres de los empleados activos (activo = 1).','SELECT nombre FROM empleados WHERE activo = 1'],
['facil','Muestra nombre y salario de quienes ganan más de 3500.','SELECT nombre, salario FROM empleados WHERE salario > 3500'],
['facil','Muestra los nombres de quienes trabajan en Ventas.','SELECT nombre FROM empleados WHERE departamento = \'Ventas\''],
['facil','Muestra el salario más alto.','SELECT MAX(salario) FROM empleados'],
['facil','Cuenta todos los empleados.','SELECT COUNT(*) FROM empleados'],
['facil','Muestra los nombres de los empleados cuyo salario es desconocido (NULL).','SELECT nombre FROM empleados WHERE salario IS NULL'],
['facil','Muestra las ciudades distintas de la tabla departamentos.','SELECT DISTINCT ciudad FROM departamentos'],
['medio','Muestra departamento y cantidad de empleados por departamento.','SELECT departamento, COUNT(*) FROM empleados GROUP BY departamento'],
['medio','Muestra departamento y salario promedio por departamento.','SELECT departamento, AVG(salario) FROM empleados GROUP BY departamento'],
['medio','Muestra el nombre del empleado y la ciudad de su departamento.','SELECT e.nombre, d.ciudad FROM empleados e JOIN departamentos d ON e.departamento = d.nombre'],
['medio','Muestra los departamentos que tienen al menos dos empleados y su cantidad.','SELECT departamento, COUNT(*) FROM empleados GROUP BY departamento HAVING COUNT(*) >= 2'],
['medio','Muestra nombre y salario de los empleados activos que ganan al menos 4000.','SELECT nombre, salario FROM empleados WHERE activo = 1 AND salario >= 4000'],
['medio','Muestra cuántos empleados tienen salario registrado (no NULL).','SELECT COUNT(salario) FROM empleados'],
['medio','Muestra el nombre y salario de los empleados que ganan entre 3000 y 4000 inclusive.','SELECT nombre, salario FROM empleados WHERE salario BETWEEN 3000 AND 4000'],
['medio','Muestra los nombres de empleados cuyo nombre comienza por la letra A.','SELECT nombre FROM empleados WHERE nombre LIKE \'A%\''],
['dificil','Muestra el nombre de cada departamento y el número de empleados, incluyendo departamentos sin empleados.','SELECT d.nombre, COUNT(e.id) FROM departamentos d LEFT JOIN empleados e ON d.nombre = e.departamento GROUP BY d.nombre'],
['dificil','Muestra los nombres de los empleados que ganan más que el salario promedio de todos los empleados.','SELECT nombre FROM empleados WHERE salario > (SELECT AVG(salario) FROM empleados)'],
['dificil','Muestra los nombres de departamentos sin empleados.','SELECT d.nombre FROM departamentos d LEFT JOIN empleados e ON d.nombre = e.departamento WHERE e.id IS NULL'],
['dificil','Muestra el segundo salario distinto más alto.','SELECT MAX(salario) FROM empleados WHERE salario < (SELECT MAX(salario) FROM empleados)'],
['dificil','Muestra departamento y suma de salarios solo de departamentos con salario total superior a 7000.','SELECT departamento, SUM(salario) FROM empleados GROUP BY departamento HAVING SUM(salario) > 7000'],
['dificil','Muestra los nombres de empleados que ganan el salario máximo de su departamento.','SELECT e.nombre FROM empleados e WHERE e.salario = (SELECT MAX(x.salario) FROM empleados x WHERE x.departamento = e.departamento)'],
['dificil','Cuenta cuántos empleados activos tienen salario superior al promedio de salarios.','SELECT COUNT(*) FROM empleados WHERE activo = 1 AND salario > (SELECT AVG(salario) FROM empleados)'],
['dificil','Muestra departamento y número de salarios no nulos para cada departamento de empleados.','SELECT departamento, COUNT(salario) FROM empleados GROUP BY departamento']
];
const gitRows = [
['facil','Consulta el estado del repositorio.',['git status','git status -s','git status --short']],
['facil','Agrega el archivo app.js al área de preparación.',['git add app.js']],
['facil','Crea un commit con el mensaje "Inicial".',['git commit -m "Inicial"',"git commit -m 'Inicial'"]],
['facil','Muestra el historial de commits.',['git log','git log --oneline']],
['facil','Crea una rama llamada feature sin cambiar a ella.',['git branch feature']],
['facil','Cambia a la rama existente feature.',['git switch feature','git checkout feature']],
['facil','Crea y cambia a una rama llamada feature.',['git switch -c feature','git checkout -b feature']],
['facil','Prepara todos los cambios del directorio actual.',['git add .','git add -A','git add --all']],
['facil','Muestra las diferencias de los cambios que aún no están preparados.',['git diff']],
['facil','Descarga información del remoto sin fusionarla.',['git fetch','git fetch origin']],
['facil','Muestra las ramas locales.',['git branch','git branch --list']],
['facil','Muestra las direcciones de los remotos.',['git remote -v','git remote --verbose']],
['medio','Guarda temporalmente los cambios rastreados sin crear un commit.',['git stash','git stash push']],
['medio','Recupera y elimina la entrada más reciente del stash.',['git stash pop','git stash apply && git stash drop']],
['medio','Integra la rama feature en la rama actual.',['git merge feature']],
['medio','Trae e integra cambios del remoto para la rama actual.',['git pull']],
['medio','Publica la rama main en el remoto origin.',['git push origin main']],
['medio','Muestra únicamente las diferencias que están preparadas para el commit.',['git diff --staged','git diff --cached']],
['medio','Marca app.js como resuelto después de corregir un conflicto.',['git add app.js']],
['medio','Elimina la rama local feature que ya fue fusionada.',['git branch -d feature']],
['medio','Crea un nuevo commit que revierta el commit abc123.',['git revert abc123']],
['medio','Muestra los remotos configurados.',['git remote','git remote -v']],
['medio','Muestra los cambios guardados en stash.',['git stash list']],
['medio','Trae las referencias del remoto origin sin fusionar.',['git fetch origin']],
['dificil','Aplica el commit abc123 a la rama actual como un nuevo commit.',['git cherry-pick abc123']],
['dificil','Muestra el historial local de movimientos de HEAD.',['git reflog','git reflog show HEAD']],
['dificil','Inicia la búsqueda binaria del commit que introdujo un fallo.',['git bisect start']],
['dificil','Cancela un merge en curso y vuelve al estado anterior.',['git merge --abort']],
['dificil','Continúa un rebase después de resolver y preparar sus conflictos.',['git rebase --continue']],
['dificil','Cancela el rebase en curso.',['git rebase --abort']],
['dificil','Desprepara app.js sin descartar sus cambios.',['git restore --staged app.js','git reset HEAD -- app.js','git reset HEAD app.js']],
['dificil','Actualiza la rama remota con protección frente a cambios remotos inesperados.',['git push --force-with-lease']],
['dificil','Muestra el contenido de un commit identificado como abc123.',['git show abc123']],
['dificil','Aplica la entrada más reciente del stash sin eliminarla.',['git stash apply']],
['dificil','Muestra el historial condensado de una línea por commit.',['git log --oneline']],
['dificil','Muestra las ramas locales y remotas.',['git branch -a','git branch --all']]
];
const practiceQuestions = [
 ...sqlRows.map(([level,q,answer],i)=>({id:'sql'+i,level,cat:'SQL',q,answer,type:'sql',e:'Consulta de referencia: '+answer})),
 ...gitRows.map(([level,q,answers],i)=>{ const parts=answers[0].split(' '); const blank=i % 2 === 1; return {id:'git'+i,level,cat:'Git',q,answers,type:'git',blank,gitSuffix:blank?parts.slice(2).join(' '):'',e:'Ejemplo: '+answers[0]}; })
];
let sqlEnginePromise;
function getSqlEngine(){
  if (!sqlEnginePromise) sqlEnginePromise = initSqlJs({locateFile: f => 'vendor/' + f}).catch(err => {sqlEnginePromise = null; throw err});
  return sqlEnginePromise;
}
function normalizedGit(value){return value.trim().replace(/\s+/g,' ').replace(/;\s*$/, '').replace(/'/g,'"')}
function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
async function evaluateSql(answer,item){
  if(!/^\s*select\b/i.test(answer) || /;\s*\S/.test(answer)) return {correct:false,message:'Usa una sola consulta SELECT.'};
  const SQL=await getSqlEngine(); const db=new SQL.Database();
  try {
    db.run(sqlSeed);
    const actual=db.exec(answer); const expected=db.exec(item.answer);
    if(actual.length!==1 || expected.length!==1) return {correct:false,message:'La consulta debe devolver una tabla.'};
    const rows = result => result.values.map(row => JSON.stringify(row)).sort();
    const correct=actual[0].columns.length===expected[0].columns.length && JSON.stringify(rows(actual[0]))===JSON.stringify(rows(expected[0]));
    return {correct,message:correct?'Resultado correcto para los datos de práctica.':'El resultado no coincide con el esperado para los datos de práctica.',output:actual[0]};
  } catch(err){return {correct:false,message:'Error SQL: '+err.message}} finally {db.close()}
}
function renderTable(columns,rows){
 const head=columns.map(c=>'<th scope="col">'+escapeHtml(c)+'</th>').join('');
 const content=rows.length?rows.map(row=>'<tr>'+row.map(v=>'<td>'+escapeHtml(v===null?'NULL':v)+'</td>').join('')+'</tr>').join(''):'<tr><td colspan="'+columns.length+'">Sin filas</td></tr>';
 return '<div class="table-wrap"><table><thead><tr>'+head+'</tr></thead><tbody>'+content+'</tbody></table></div>';
}
function sampleTables(){
 return '<div class="table-title">empleados</div>'+renderTable(['id','nombre','departamento','salario','activo'],[[1,'Ana','Ventas',3000,1],[2,'Luis','IT',4500,1],[3,'Marta','Ventas',4000,0],[4,'Pedro','IT',5000,1],[5,'Sara','RRHH',3500,1],[6,'Elena','Ventas',null,1]])+
 '<div class="table-title">departamentos</div>'+renderTable(['nombre','ciudad'],[['Ventas','Bogotá'],['IT','Medellín'],['RRHH','Cali'],['Legal','Bogotá']]);
}
async function runSql(i){
 const item=window.currentQuiz[i]; const out=document.getElementById('output'+i); const value=document.getElementById('answer'+i).value;
 out.textContent='Ejecutando…';
 try {const result=await evaluateSql(value,item);out.innerHTML='<p>'+escapeHtml(result.message)+'</p>'+(result.output?'<div class="table-title">Resultado de tu consulta ('+result.output.values.length+' filas)</div>'+renderTable(result.output.columns,result.output.values):'')}
 catch(e){out.textContent='No se pudo cargar SQLite. Comprueba la conexión y vuelve a intentarlo.'}
}
function chooseQuestions(pool,count,key){
 let history={}; try{history=JSON.parse(localStorage.getItem('quizHistoryV2')||'{}')}catch(e){}
 const used=history[key]||[]; let available=shuffle(pool.filter(q=>!used.includes(q.id))); let selected=available.slice(0,count);
 if(selected.length<count){const already=new Set(selected.map(q=>q.id));selected.push(...shuffle(pool.filter(q=>!already.has(q.id))).slice(0,count-selected.length)); history[key]=selected.map(q=>q.id)}
 else history[key]=used.concat(selected.map(q=>q.id));
 try{localStorage.setItem('quizHistoryV2',JSON.stringify(history))}catch(e){}
 return selected;
}
