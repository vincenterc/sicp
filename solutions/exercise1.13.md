The definition of the Fibonacci numbers is

$$
Fib(n)=
\begin{cases}
0 & \text{if n=0} \\
1 & \text{if n=1} \\
Fib(n-1)+Fib(n-2) & \text{otherwise}
\end{cases}
$$

We shall prove that $Fib(n)=(\phi^n-\psi^n)/\sqrt{5}$, where $\phi=(1+\sqrt{5})/2$ and $\psi=(1+\sqrt{5}/2)$, which satisfy $\phi^2=\phi+1$ and $\psi^2=\psi+1$.

$Fib(0)=0$ and $\frac{\phi^0-\psi^0}{\sqrt{5}}=0$.

$Fib(1)=1$ and $\frac{\phi^1-\psi^1}{\sqrt{5}}=\frac{\frac{1+\sqrt{5}}{2}-\frac{1-\sqrt{5}}{2}}{\sqrt{5}}=\frac{\frac{1}{2}(1+\sqrt{5}-1+\sqrt{5})}{\sqrt{5}}=1$.

Assume that $Fib(n)=(\phi^n-\psi^n)/\sqrt{5}$ holds,

$$
\begin{aligned}
Fib(n+1) & =Fib(n)+Fib(n-1) \\
& =\frac{\phi^n-\psi^n}{\sqrt{5}}+\frac{\phi^{n-1}-\psi^{n-1}}{\sqrt{5}} \\
& =\frac{(\phi^n+\phi^{n-1})-(\psi^n+\psi^{n-1})}{\sqrt{5}} \\
& =\frac{\phi^{n-1}(\phi+1)-\psi^{n-1}(\psi+1)}{\sqrt{5}} \\
& =\frac{\phi^{n-1}\phi^2-\psi^{n-1}\psi^2}{\sqrt{5}} \\
& =\frac{\phi^{n+1}-\psi^{n+1}}{\sqrt{5}}
\end{aligned}
$$

So the statement, $Fib(n)=(\phi^n-\psi^n)/\sqrt{5}$, is true.

Since $|\psi|<1$ and $\sqrt{5} > 2$, we get $\left|\frac{\psi^n}{\sqrt{5}}\right|<\frac{1}{2}$. Then $Fib(n)$ is the closet integer to $\phi^n/\sqrt{5}$.
